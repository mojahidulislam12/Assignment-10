"use client";

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
import { useState } from "react";
import { BiShow, BiSolidHide } from "react-icons/bi";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100 px-4">
      {/* MAIN CARD */}
      <Card className="w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-slate-200 bg-white">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>

          <p className="text-sm text-slate-500 mt-1">
            Join LegalEase and connect with professional lawyers
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* FULL NAME */}
          <TextField isRequired name="fullName">
            <Label className="text-slate-700 font-medium">Full Name</Label>

            <Input
              placeholder="John Doe"
              className="rounded-xl w-full border-slate-200 focus:ring-2 focus:ring-indigo-400"
            />

            <FieldError />
          </TextField>

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

          <TextField isRequired name="image">
            <Label className="text-slate-700 font-medium">Image URL</Label>

            <Input
              placeholder="Image url..."
              className="rounded-xl w-full border-slate-200 focus:ring-2 focus:ring-indigo-400"
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

          {/* CONFIRM PASSWORD */}

          <TextField isRequired name="confirmPassword">
            <Label>Confirm Password</Label>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="pr-20 w-full"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-indigo-600 hover:text-indigo-800"
              >
                {showConfirmPassword ? (
                  <BiSolidHide className="w-6 h-6" />
                ) : (
                  <BiShow className="w-6 h-6" />
                )}
              </button>
            </div>

            <FieldError />
          </TextField>

          {/* ROLE SECTION */}
          <div className="p-5 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50">
            <Label className="block mb-3 font-semibold text-indigo-700">
              Select Your Role
            </Label>

            <RadioGroup
              name="role"
              className="flex gap-6 text-slate-700"
              isRequired
            >
              <Radio
                value="client"
                className="px-3 py-2  rounded-lg border border-slate-200 bg-white hover:border-indigo-300"
              >
                <Radio.Content>
                  {" "}
                  <Radio.Control>
                    👤 <Radio.Indicator />{" "}
                  </Radio.Control>{" "}
                  Client (User){" "}
                </Radio.Content>
              </Radio>

              <Radio
                value="lawyer"
                className="flex  px-3 py-2 rounded-lg border border-slate-200 bg-white hover:border-indigo-300"
              >
                <Radio.Content>
                  {" "}
                  <Radio.Control>
                    {" "}
                    <Radio.Indicator /> ⚖️
                  </Radio.Control>{" "}
                  Lawyer{" "}
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition-all shadow-md"
          >
            Create Account
          </Button>
        </Form>
        {/* LOGIN LINK */}
        <div className="text-center mt-5">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/signin">
              <span className="text-indigo-600 font-semibold hover:text-indigo-800 transition cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
