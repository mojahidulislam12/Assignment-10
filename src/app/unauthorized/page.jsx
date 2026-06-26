"use client";

import Link from "next/link";
import { ShieldExclamation, ArrowLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
          <ShieldExclamation className="w-10 h-10 text-red-500" />
        </div>

        {/* Error Code */}
        <p className="mt-8 text-red-500 font-semibold tracking-widest uppercase">
          Error 403
        </p>

        {/* Title */}
        <h1 className="mt-2 text-4xl font-bold text-white">Access Denied</h1>

        {/* Description */}
        <p className="mt-4 text-zinc-400 leading-relaxed">
          Sorry, you do not have permission to access this page. Please sign in
          with an account that has the required role or contact the
          administrator if you believe this is a mistake.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            color="primary"
            size="lg"
            className="btn font-semibold"
          >
            Go Home
          </Link>

          <Link
            href={"/signin"}
            variant="bordered"
            size="lg"
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-zinc-500">
          If you think this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}
