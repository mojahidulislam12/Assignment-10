import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;
    const formData = await request.formData();
    const price = formData.get("price");
    const caseType = formData.get("type");
    const lawyerId = formData.get("lawyerId");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              caseType: caseType,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: Number(price),
        userId: user.id,
        userEmail: user.email,
        caseType,
        lawyerId,
      },
      mode: "payment",
      success_url: `${origin}/dashboard/client/hiring-history?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
