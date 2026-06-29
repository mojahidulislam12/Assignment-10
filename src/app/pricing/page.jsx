"use client";

import React, { useState } from "react";
import {
  Check,
  CircleQuestion,
  ChevronDown,
  Person,
  Briefcase,
  Rocket,
  Star,
} from "@gravity-ui/icons";

const PricingPage = () => {
  const [billingTarget, setBillingTarget] = useState("client");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const clientPlans = [
    {
      name: "Pro",
      id: "client_pro",
      price: "$4",
      period: "/month",
      description:
        "Ideal for individuals and businesses requiring regular legal services.",
      icon: <Star className="w-5 h-5 text-blue-400" />,
      features: [
        "Send up to 20 hire requests per month",
        "Priority lawyer matching",
        "Hire request tracking dashboard",
        "Priority support",
      ],
      popular: true,
    },
    // {
    //   name: "Premium",
    //   id: "client_premium",
    //   price: "$10",
    //   period: "/month",
    //   description:
    //     "Unlimited access to lawyers and premium consultation features.",
    //   icon: <Star className="w-5 h-5 text-purple-400" />,
    //   features: [
    //     "Unlimited hire requests",
    //     "Featured client profile",
    //     "Instant consultation requests",
    //     "24/7 premium support",
    //   ],
    //   popular: false,
    // },
  ];

  const lawyerPlans = [
    {
      name: "Professional",
      id: "lawyer_pro",
      price: "$10",
      period: "/month",
      description:
        "Increase visibility and attract more clients to your legal practice.",
      icon: <Rocket className="w-5 h-5 text-blue-400" />,
      features: [
        "Unlimited hire requests",
        "Priority search ranking",
        "Client management dashboard",
        "Analytics & insights",
      ],
      popular: true,
    },
    // {
    //   name: "Chamber",
    //   id: "lawyer_chamber",
    //   price: "$149",
    //   period: "/month",
    //   description: "Perfect for law firms and senior legal professionals.",
    //   icon: <Star className="w-5 h-5 text-purple-400" />,
    //   features: [
    //     "Everything in Professional",
    //     "Multiple lawyer profiles",
    //     "Firm branding",
    //     "Featured placement",
    //     "Dedicated account manager",
    //     "Advanced analytics",
    //   ],
    //   popular: false,
    // },
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes. You can cancel, upgrade, or downgrade your subscription at any time from your dashboard.",
    },
    {
      question: "How many hire requests can clients send?",
      answer:
        "Free clients can send up to 3 requests monthly. Pro and Premium plans provide higher or unlimited limits.",
    },
    {
      question: "How do lawyers benefit from premium plans?",
      answer:
        "Premium lawyer plans provide better visibility, priority placement, analytics, and unlimited client requests.",
    },
    {
      question: "Can law firms manage multiple lawyers?",
      answer:
        "Yes. The Chamber plan allows law firms to manage multiple lawyer profiles and team members.",
    },
  ];

  const activePlans = billingTarget === "client" ? clientPlans : lawyerPlans;

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Legal Marketplace Pricing
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mt-2 tracking-tight">
            Flexible Legal Plans Tailored To Your Needs
          </h1>

          <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
            Whether you are looking to hire experienced lawyers or grow your
            legal practice, our plans are designed to help you achieve your
            goals.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setBillingTarget("client")}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                billingTarget === "client"
                  ? "bg-zinc-800 text-white border border-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Person className="w-4 h-4" />
              For Clients
            </button>

            <button
              onClick={() => setBillingTarget("lawyer")}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                billingTarget === "lawyer"
                  ? "bg-zinc-800 text-white border border-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              For Lawyers
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-24 max-w-2xl mx-auto">
          {activePlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-zinc-900 border rounded-2xl p-6 flex flex-col justify-between min-h-[500px] transition-all hover:-translate-y-1 ${
                plan.popular
                  ? "border-blue-500 ring-2 ring-blue-500/10"
                  : "border-zinc-800"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold text-white bg-blue-600 rounded-full">
                  MOST POPULAR
                </span>
              )}

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="p-2 rounded-lg border border-zinc-800">
                    {plan.icon}
                  </div>
                </div>

                <p className="text-xs text-zinc-400 min-h-[40px]">
                  {plan.description}
                </p>

                <div className="my-6 flex items-end gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-zinc-500 text-xs">{plan.period}</span>
                </div>

                <hr className="border-zinc-800 mb-6" />

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>

                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="plan_id" value={plan.id} />
                <section>
                  <button
                    className="btn btn-success w-full"
                    type="submit"
                    role="link"
                  >
                    Checkout
                  </button>
                </section>
              </form>
            </div>
          ))}
        </div>

        {/* FAQ */}
      </div>
    </div>
  );
};

export default PricingPage;
