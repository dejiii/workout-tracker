import React from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/Input";

const Signup = () => {
  return (
    <div className="w-full min-h-screen flex">
      <div className="hidden lg:flex w-1/2 relative bg-zinc-900">
        <div
          className="absolute inset-0 bg-[url('/banner.jpg')] bg-cover bg-center opacity-50"
          aria-hidden="true"
        />
        <div className="relative z-10 w-full flex flex-col justify-between p-12">
          <div className="flex items-center gap-2 text-white font-medium text-lg">
            <Dumbbell className="h-6 w-6" />
            <span>Workout Tracker</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-white tracking-tight">
              Start your journey today
            </h3>
            <p className="text-zinc-300 text-lg max-w-md italic">
              &quot;The only bad workout is the one that didn&apos;t happen.
              Track your progress and crush your goals.&quot;
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="absolute top-8 right-8 hidden md:block">
          <Link href="/signin" className="text-sm font-medium hover:underline">
            Login
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

            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-zinc-500">
              Enter your email below to create your account
            </p>
          </div>

          <div className="grid gap-6">
            <form className="space-y-4">
              <Input
                label="Name"
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
              />
              <Input
                label="Email"
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
              <Input
                label="Password"
                id="password"
                type="password"
                autoComplete="new-password"
              />
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2 w-full"
                type="submit"
              >
                Sign In with Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
