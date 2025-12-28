"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormValues } from "@/lib/validations/auth";
import AuthLayout from "@/components/layout/AuthLayout";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
  };

  return (
    <AuthLayout
      bgImage="/banner.jpg"
      title="Start your journey today"
      quote='"The only bad workout is the one that didn&apos;t happen. Track your progress and crush your goals."'
      headerLinkText="Sign In"
      headerLinkHref="/signin"
      headerText="Create an account"
      headerSubText="Enter your email below to create your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          id="name"
          placeholder="John Doe"
          type="text"
          autoCapitalize="none"
          autoComplete="name"
          autoCorrect="off"
          error={errors.name?.message}
          {...register("name")}
        />
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
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button className="w-full" type="submit">
          Create Account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
