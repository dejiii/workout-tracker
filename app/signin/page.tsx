"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, SigninFormValues } from "@/lib/validations/auth";
import { useSignInUser } from "@/hooks/api/auth/useSignInUser";
import AuthLayout from "@/components/layout/AuthLayout";

const Signin = () => {
  const { mutate: signIn, isPending } = useSignInUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: SigninFormValues) => {
    signIn(data);
  };

  return (
    <AuthLayout
      bgImage="/splash.jpg"
      title="Welcome back"
      quote='"Consistency is what transforms average into excellence. Keep showing up."'
      headerLinkText="Create an account"
      headerLinkHref="/signup"
      headerText="Sign in"
      headerSubText="Enter your email below to sign in to your account"
    >
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
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signin;
