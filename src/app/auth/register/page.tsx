"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter()

  const onSubmit = async (
  e: FormEvent<HTMLFormElement>
): Promise<void> => {
  e.preventDefault();

  const form = e.currentTarget;

  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement).value;

  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
    role: "user",
  });

  if (error) {
    alert(error.message);
    return;
  }

  if (data) {
    alert("Successfully Registered");
    router.push("/login");
  }
};

const handleGoogleSignIn = async (): Promise<void> => {
  const { error } = await authClient.signIn.social({
    provider: "google",
  });

  if (error) {
    toast.error(error.message);
  }
};
  
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
            <ShoppingBag className="h-7 w-7" />
          </div>

          <h1 className="text-3xl font-bold">Create Account</h1>

          <p className="mt-2 text-sm text-slate-500">
            Join Shop Nest and start shopping today.
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>

            <div className="relative mt-2">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <div className="relative mt-2">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Create Account
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="mx-4 text-sm text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <Button
          variant="outline"
          className="w-full"
        >
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}