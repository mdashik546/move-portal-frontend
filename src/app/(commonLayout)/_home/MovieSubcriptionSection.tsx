"use client";

import { Check, Film } from "lucide-react";

export function MovieSubscriptionSection() {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$4.99",
      period: "/month",
      description: "Perfect for casual viewers",
      features: [
        "Stream motorcycle movies",
        "SD quality",
        "1 device",
        "Ad-supported",
        "Monthly renewal",
      ],
      badge: null,
      cta: "Subscribe Now",
    },
    {
      id: "standard",
      name: "Standard",
      price: "$9.99",
      period: "/month",
      description: "Most popular choice",
      features: [
        "Stream all motorcycle movies",
        "HD quality (1080p)",
        "2 devices simultaneously",
        "Ad-free viewing",
        "Download content",
        "Monthly renewal",
      ],
      badge: "Most Popular",
      cta: "Start Subscription",
      highlighted: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$15.99",
      period: "/month",
      description: "Ultimate movie experience",
      features: [
        "All Standard features",
        "4K Ultra HD quality",
        "4 devices simultaneously",
        "Ad-free viewing",
        "Download unlimited content",
        "Exclusive director commentaries",
        "Early access to new releases",
        "Monthly renewal",
      ],
      badge: null,
      cta: "Get Premium",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="app-container">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <Film className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
            Movie Subscriptions
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Stream high-octane action films, intense racing movies, and engaging
            documentaries — all in one place with a 1-month plan. Cancel
            anytime. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg border transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary bg-linear-to-br from-gray-900 to-black scale-105 shadow-2xl shadow-primary/20"
                  : "border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-primary px-4 py-1 text-sm font-bold text-white">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col p-8">
                {/* Plan Name */}
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {plan.name}
                </h3>
                <p className="mb-6 text-sm text-gray-400">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-black text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                  <p className="mt-2 text-xs text-gray-500">
                    1-month subscription, then renews monthly
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  className={`mb-8 rounded-lg py-3 px-6 font-bold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-primary text-white hover:bg-primary/90 active:scale-95"
                      : "border border-primary bg-transparent text-primary hover:bg-primary/10 active:scale-95"
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    What&apos;s Included
                  </p>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

   
      </div>
    </section>
  );
}
