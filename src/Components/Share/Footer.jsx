"use client";

import Link from "next/link";
import { Button, Input } from "@heroui/react";

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-10">
      <div className="container mx-auto px-4 py-10 grid gap-10 md:grid-cols-3">
        {/* LEFT - BRAND */}
        <div>
          <h2 className="text-xl font-bold text-primary">LegalEase</h2>

          <p className="text-sm text-default-500 mt-2">
            Your trusted legal assistance platform.
          </p>

          <p className="text-xs text-default-400 mt-4">
            © {new Date().getFullYear()} LegalEase. All rights reserved.
          </p>
        </div>

        {/* MIDDLE - QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>

            <li>
              <Link href="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT - NEWSLETTER + SOCIAL */}
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>

          {/* Newsletter form */}
          <div className="flex gap-2 mb-4">
            <Input placeholder="Enter your email" size="sm" />
            <Button size="sm" color="primary">
              Subscribe
            </Button>
          </div>

          {/* Social (dummy buttons instead of icons to avoid errors) */}
          <div className="flex gap-2">
            <Button size="sm" variant="light">
              Facebook
            </Button>

            <Button size="sm" variant="light">
              Twitter
            </Button>

            <Button size="sm" variant="light">
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
