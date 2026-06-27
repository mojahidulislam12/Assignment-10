"use client";

import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { FaEnvelope, FaUser } from "react-icons/fa";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/signin";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   const user = Object.fromEntries(formData.entries());

  //   if (user.password !== user.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }
  //   console.log(user);
  //   const { data, error } = await authClient.signUp.email({
  //     name: user.fullName, // required
  //     email: user.email, // required
  //     password: user.password, // required
  //     image: user.image,
  //     role: user.role,
  //   });

  //   if (data) {
  //     toast.success("SignUp Successfully");
  //     router.push(redirectTo);
  //   }
  // };
  const onSubmit = async (data) => {
    // Upload image to imgbb
    console.log(data);

    const imageFile = data.image[0];
    const imageUrl = await uploadImage(imageFile);
    // console.log(imageUrl);
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { data: signUpData, error: signUpError } =
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: imageUrl,
        role: data.role,
      });

    if (signUpData) {
      toast.success("SignUp Successfully");
      router.push(redirectTo);
    }

    console.log(signUpData, signUpError);

    if (signUpError) {
      toast.error("Registration not succeed...");
    } else {
      redirect("/");
    }
  };
  console.log(errors);
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
          <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>

          <p className="text-sm text-slate-500 mt-1">
            Join LegalEase and connect with professional lawyers
          </p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* FULL NAME */}
          <Label htmlFor="name">Full Name</Label>

          <Input
            {...register("name", { required: "Name is Required" })}
            id="name"
            placeholder="John Doe"
            labelPlacement="outside"
            startContent={<FaUser className="text-slate-400 text-sm" />}
            className="w-full  border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
          />

          {/* EMAIL */}
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email", { required: "Email is Required" })}
            id="email"
            placeholder="john@example.com"
            type="email"
            labelPlacement="outside"
            startContent={<FaEnvelope className="text-slate-400 text-sm" />}
            className="w-full  border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
          />

          <Label htmlFor="image">Profile Image URL</Label>

          <Input
            {...register("image", { required: "image is Required" })}
            type="file"
            accept="image/*"
            id="image"
            placeholder="https://example.com/avatar.jpg"
            labelPlacement="outside"
            className="w-full  border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
          />

          {/* PASSWORD */}

          <TextField isRequired name="password">
            <Label className="text-slate-700 font-medium">Password</Label>

            <div className="relative">
              <TextField isRequired name="password">
                <Label className="text-slate-700 font-medium">Password</Label>

                <div className="relative">
                  <Input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    id="password"
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
            </div>

            <FieldError />
          </TextField>

          {/* CONFIRM PASSWORD */}

          <TextField isRequired name="confirmPassword">
            <Label>Confirm Password</Label>

            <div className="relative">
              <Input
                {...register("confirmPassword", {
                  required: "Password is required",
                })}
                id="confirmPassword"
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
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
            >
              <option value="client">Client</option>
              <option value="lawyer">Lawyer</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-white md:hover:bg-white hover:text-black md:hover:text-black text-white font-semibold py-2 rounded-xl transition-all shadow-md"
          >
            Create Account
          </Button>
        </Form>
        <div className="divider">OR</div>
        {/* Social login */}
        <div className="md:flex">
          <div className="flex-1">
            {" "}
            <Button
              onClick={handleGoogleSignin}
              className="w-full hover:bg-white md:hover:bg-white hover:text-black md:hover:text-black"
            >
              Login with Google
            </Button>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="flex-1">
            {" "}
            <Button
              onClick={handleGithubSignin}
              className="w-full hover:bg-white md:hover:bg-white hover:text-black md:hover:text-black"
            >
              Login with GitHUb
            </Button>
          </div>
        </div>
        <div className="text-center mt-5">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link href={`/signin?redirect=${redirectTo}`}>
              <span className="text-indigo-600 font-semibold hover:text-indigo-800 transition cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>

        {/* LOGIN LINK */}
      </Card>
    </div>
  );
}
