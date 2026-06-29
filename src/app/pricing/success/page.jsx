import { subscription } from "@/lib/action/payment";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    await subscription({ ...metadata, sessionId: session_id });
    return (
      <section id="success" className="border max-w-3xl mx-auto mt-20">
        <p className="text-center space-y-3">
          Payment SuccessFul! <br />{" "}
          <span className="font-bold">A confirmation email:</span>
          {customerEmail}.<br /> If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
          <p className="font-bold">Please Login and Got Dashboard</p>
          <Link href={"/signin"}>
            <button className=" w-full rounded-xl bg-green-600 py-3 text-white font-semibold transition-all duration-300 hover:bg-green-700 hover:shadow-lg">
              LogIn
            </button>
          </Link>
        </p>
      </section>
    );
  }
}
