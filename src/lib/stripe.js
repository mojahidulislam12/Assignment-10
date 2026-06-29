import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  client_pro: "price_1TnUOZ85b6Jt7npjbx8TQ1qH",
  lawyer_pro: "price_1TmGBR85b6Jt7npjjEE2gEuX",
};
