import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { Readable } from 'stream';
import path from 'path';
import { getBookById, type Book } from '@/app/lib/books';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

/**
 * Delivers a purchased book PDF.
 *
 * GET /api/download?session_id=cs_...          → streams the PDF
 * GET /api/download?session_id=cs_...&check=1  → JSON { paid, bookId, title, fileReady }
 *
 * The session_id is the buyer's proof of purchase: we retrieve the Checkout
 * session from Stripe server-side and only serve the file when Stripe says
 * payment_status is "paid". PDFs live in app/private/books/ (not /public),
 * so this route is the only way to reach them.
 *
 * The response is streamed, not buffered — Vercel caps buffered function
 * responses at ~4.5 MB and the memoir PDF is 21 MB.
 */

function pdfPath(book: Book): string {
  return path.join(process.cwd(), 'app', 'private', 'books', book.fileName);
}

async function pdfSize(book: Book): Promise<number | null> {
  try {
    const s = await stat(pdfPath(book));
    return s.isFile() ? s.size : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');
  const checkOnly = req.nextUrl.searchParams.get('check') === '1';

  if (!sessionId || !sessionId.startsWith('cs_')) {
    return NextResponse.json({ error: 'Missing or invalid session_id' }, { status: 400 });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
  }

  const bookId = session.metadata?.bookId;
  const book = bookId ? getBookById(bookId) : undefined;
  const paid = session.payment_status === 'paid';

  if (checkOnly) {
    const fileReady = paid && book ? (await pdfSize(book)) !== null : false;
    return NextResponse.json({
      paid,
      bookId: book?.id ?? null,
      title: book?.title ?? null,
      format: session.metadata?.format === 'print' ? 'print' : 'pdf',
      fileReady,
    });
  }

  if (!paid) {
    return NextResponse.json({ error: 'Payment not completed' }, { status: 402 });
  }
  if (!book) {
    return NextResponse.json({ error: 'This purchase is not a book' }, { status: 400 });
  }

  const size = await pdfSize(book);
  if (size === null) {
    // Purchase is valid but the file hasn't been uploaded to the server yet.
    return NextResponse.json(
      {
        error:
          'Your purchase is confirmed, but the download is temporarily unavailable. ' +
          'Email contact@yorksims.com with your receipt and you will get the PDF directly.',
      },
      { status: 503 }
    );
  }

  const stream = Readable.toWeb(createReadStream(pdfPath(book))) as ReadableStream;
  const safeName = book.title.replace(/[^a-zA-Z0-9 \-:,]/g, '').trim();
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeName}.pdf"`,
      'Content-Length': String(size),
      'Cache-Control': 'private, no-store',
    },
  });
}
