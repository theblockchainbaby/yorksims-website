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
 * Creates a Stripe Checkout session for a one-time book (PDF) purchase.
 *
 * Body: { bookId: string } — must match an id in app/lib/books.ts.
 * Price is resolved server-side from the catalog; the client never sends an amount.
 *
 * Subscriptions were removed on purpose — everything on the site is free
 * except the book PDFs, which are the only paid product.
 */
export async function POST(req: NextRequest) {
  try {
    const { bookId } = await req.json();

    const book = getBookById(bookId);
    if (!book) {
      return NextResponse.json({ error: 'Unknown book' }, { status: 400 });
    }

    const baseUrl = getBaseUrl(req);

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${book.title} (PDF)`,
              description: book.description,
              images: [`${baseUrl}${book.cover}`],
            },
            unit_amount: book.priceCents,
          },
          quantity: 1,
        },
      ],
      metadata: { bookId: book.id },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/books`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
