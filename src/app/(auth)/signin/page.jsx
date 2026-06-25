"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  RadioGroup,
  Radio,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiShow, BiSolidHide } from "react-icons/bi";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  //const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // if (data.password !== data.confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }
    const { data, error } = await authClient.signIn.email({
      email: user.email, // required
      password: user.password, // required
      rememberMe: true,
    });
    if (data) {
      alert("Login Successful");
      router.push(redirectTo);
    }

    console.log(user, data);
  };

  // Google login
  const handleGoogleSignin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  // Github login
  const handleGithubSignin = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100 px-4">
      {/* MAIN CARD */}
      <Card className="w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-slate-200 bg-white">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>

          <p className="text-sm text-slate-500 mt-1">
            Login to your LegalEase account
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* EMAIL */}
          <TextField isRequired name="email">
            <Label className="text-slate-700 font-medium">Email Address</Label>

            <Input
              type="email"
              placeholder="john@example.com"
              className="rounded-xl border-slate-200 w-full focus:ring-2 focus:ring-indigo-400"
            />

            <FieldError />
          </TextField>

          {/* PASSWORD */}

          <TextField isRequired name="password">
            <Label className="text-slate-700 font-medium">Password</Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="pr-20 w-full"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-indigo-600 hover:text-indigo-800"
              >
                {showPassword ? (
                  <BiSolidHide className="w-6 h-6" />
                ) : (
                  <BiShow className="w-6 h-6" />
                )}
              </button>
            </div>

            <FieldError />
          </TextField>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition-all shadow-md"
          >
            Login
          </Button>
        </Form>
        <div className="divider">OR</div>
        {/* Social login */}
        <div className="flex">
          <div className="flex-1">
            {" "}
            <Button onClick={handleGoogleSignin} className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="flex-1">
            {" "}
            <Button onClick={handleGithubSignin} className="w-full">
              Login with GitHUb
            </Button>
          </div>
        </div>
        {/* LOGIN LINK */}
        <div className="text-center mt-5">
          <p className="text-sm text-slate-600">
            Do not have an account?{" "}
            <Link href={`/signup?redirect=${redirectTo}`}>
              <span className="text-indigo-600 font-semibold hover:text-indigo-800 transition cursor-pointer">
                Create Account
              </span>
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
