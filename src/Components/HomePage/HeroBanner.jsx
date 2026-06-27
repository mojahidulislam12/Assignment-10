"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

const slides = [
  {
    title: "Find Expert Lawyers Instantly",
    desc: "Connect with verified legal professionals for your needs.",
  },
  {
    title: "Get Legal Advice Anytime",
    desc: "Book consultations with top-rated lawyers in minutes.",
  },
  {
    title: "Trusted Legal Assistance Platform",
    desc: "Secure, fast, and reliable legal support for everyone.",
  },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4 text-center">
        {/* Slide Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary transition-all">
          {slides[index].title}
        </h1>

        <p className="mt-4 text-default-600 max-w-2xl mx-auto">
          {slides[index].desc}
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-3 justify-center">
          <Link href={"/browseLawyer"}>
            <Button className="w-35 text-xl hover:bg-white hover:text-black">
              Find Lawyers
            </Button>
          </Link>

          {/* <Button variant="light" as={Link} href="/about">
            Learn More
          </Button> */}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === index ? "bg-primary w-6" : "bg-default-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
