"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes! You can cancel your subscription at any time. Your access will continue until the end of your current billing cycle.",
    },
    {
      q: "Can I change my plan?",
      a: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing date.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, Mastercard, American Express) and digital wallets (Apple Pay, Google Pay).",
    },
    {
      q: "Is there a free trial?",
      a: "New subscribers get a 7-day free trial on any plan. No credit card required to start.",
    },
  ];

  return (
    <div className="mt-12 app-container">
      
      {/* Title */}
      <h3 className="mb-6 text-2xl font-bold text-white">
        Frequently Asked Questions
      </h3>

      {/* Accordion */}
      <Accordion type="single" collapsible className="w-full space-y-2">

        {faqs.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-2"
          >
            <AccordionTrigger className="text-white hover:no-underline">
              {item.q}
            </AccordionTrigger>

            <AccordionContent className="text-sm text-gray-400">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}

      </Accordion>

    </div>
  );
}