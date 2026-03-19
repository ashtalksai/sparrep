import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

export const PLANS = {
  free: {
    name: "Starter",
    sessions: 3,
    price: 0,
  },
  pro: {
    name: "Sparring Pro",
    sessions: -1, // unlimited
    price: 49,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    annualPriceId: process.env.STRIPE_PRO_ANNUAL_PRICE_ID,
  },
}
