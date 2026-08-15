import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getBookById } from '@/app/lib/books';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

// Stripe rejects the whole session if success_url isn't a valid URL, so never
// trust NEXT_PUBLIC_APP_URL blindly — a stray "\n" pasted into the Vercel env
// var once took checkout down. Sanitize it, and fall back to the request origin.
function getBaseUrl(req: NextRequest): string {
  const raw = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\\n/g, '').trim();
  if (raw) {
    try {
      return new URL(raw).origin;
    } catch {
      // fall through to request origin
    }
  }
  return req.nextUrl.origin;
}

/**
 * Creates a Stripe Checkout session for a one-time book purchase.
 *
 * Body: { bookId: string, format?: 'pdf' | 'print' } — bookId must match an
 * id in app/lib/books.ts; format defaults to 'pdf'. Price is resolved
 * server-side from the catalog; the client never sends an amount.
 *
 * 'print' orders collect a US shipping address at checkout. Fulfillment is
 * manual: the order (with address) appears in the Stripe dashboard and York
 * places a Lulu print order shipped to the buyer. Print buyers also get the
 * PDF — the download route only checks that the session is paid.
 *
 * Subscriptions were removed on purpose — everything on the site is free
 * except the books, which are the only paid product.
 */
export async function POST(req: NextRequest) {
  try {
    const { bookId, format = 'pdf' } = await req.json();

    const book = getBookById(bookId);
    if (!book) {
      return NextResponse.json({ error: 'Unknown book' }, { status: 400 });
    }
    if (format !== 'pdf' && format !== 'print') {
      return NextResponse.json({ error: 'Unknown format' }, { status: 400 });
    }

    const baseUrl = getBaseUrl(req);
    const isPrint = format === 'print';
    const formatLabel = isPrint
      ? book.printFormat === 'hardcover'
        ? 'Hardcover'
        : 'Paperback'
      : 'PDF';

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${book.title} (${formatLabel})`,
              description: isPrint
                ? `${book.description} Printed on demand and shipped — includes the PDF instantly.`
                : book.description,
              images: [`${baseUrl}${book.cover}`],
            },
            unit_amount: isPrint ? book.printPriceCents : book.priceCents,
          },
          quantity: 1,
        },
      ],
      ...(isPrint && {
        shipping_address_collection: { allowed_countries: ['US'] },
      }),
      metadata: { bookId: book.id, format },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/books`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
