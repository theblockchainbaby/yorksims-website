import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

const PRICES = {
  pro_monthly:   { amount: 2900,   interval: 'month' as const, name: 'Pro — Monthly',   desc: 'Full platform access, all 10 verticals' },
  pro_yearly:    { amount: 29000,  interval: 'year'  as const, name: 'Pro — Yearly',    desc: 'Full platform access — 2 months free' },
  builder_monthly: { amount: 9900, interval: 'month' as const, name: 'Builder — Monthly', desc: 'Live builds, code repos & small group coaching' },
  builder_yearly:  { amount: 99000,interval: 'year'  as const, name: 'Builder — Yearly',  desc: 'Live builds — 2 months free' },
  one_on_one_monthly: { amount: 50000, interval: 'month' as const, name: '1-on-1 — Monthly', desc: 'Direct access, up to 5 hrs/week' },
  one_on_one_yearly:  { amount: 300000,interval: 'year'  as const, name: '1-on-1 — Yearly',  desc: 'Direct access — 50% off' },
};

export async function POST(req: NextRequest) {
  try {
    const { priceKey } = await req.json();

    const plan = PRICES[priceKey as keyof typeof PRICES];
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: plan.name, description: plan.desc },
            recurring: { interval: plan.interval },
            unit_amount: plan.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
