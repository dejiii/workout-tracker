"use client";

import React from "react";
import Link from "next/link";
import { Dumbbell, Github, Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, SigninFormValues } from "@/lib/validations/auth";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: SigninFormValues) => {
    console.log(data);
  };

  return (
    <div className="w-full min-h-screen flex">
      <div className="hidden lg:flex w-1/2 relative bg-zinc-900">
        <div
          className="absolute inset-0 bg-[url('/splash.jpg')] bg-cover bg-center opacity-50"
          aria-hidden="true"
        />
        <div className="relative z-10 w-full flex flex-col justify-between p-12">
          <div className="flex items-center gap-2 text-white font-medium text-lg">
            <Dumbbell className="h-6 w-6" />
            <span>Workout Tracker</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-white tracking-tight">
              Welcome back
            </h3>
            <p className="text-zinc-300 text-lg max-w-md italic">
              &quot;Consistency is what transforms average into excellence. Keep
              showing up.&quot;
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="absolute top-8 right-8 hidden md:block">
          <Link href="/signup" className="text-sm font-medium hover:underline">
            Create an account
          </Link>
        </div>
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col space-y-2 text-center">
            <div className="lg:hidden flex justify-center mb-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Dumbbell className="h-6 w-6" />
                <span>Workout Tracker</span>
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-zinc-500">
              Enter your email below to sign in to your account
            </p>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email"
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Password"
                id="password"
                type="password"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password")}
              />
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
