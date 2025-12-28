import React, { ReactNode } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

type AuthLayoutProps = {
  children: ReactNode;
  bgImage: string;
  title: string;
  quote: string;
  headerLinkText: string;
  headerLinkHref: string;
  headerText: string;
  headerSubText: string;
};

const AuthLayout = ({
  children,
  bgImage,
  title,
  quote,
  headerLinkText,
  headerLinkHref,
  headerText,
  headerSubText,
}: AuthLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex">
      <div className="hidden lg:flex w-1/2 relative bg-zinc-900">
        <div
          className={`absolute inset-0 bg-cover bg-center opacity-50`}
          style={{ backgroundImage: `url('${bgImage}')` }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full flex flex-col justify-between p-12">
          <div className="flex items-center gap-2 text-white font-medium text-lg">
            <Dumbbell className="h-6 w-6" />
            <span>Workout Tracker</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-white tracking-tight">
              {title}
            </h3>
            <p className="text-zinc-300 text-lg max-w-md italic">{quote}</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="absolute top-8 right-8 hidden md:block">
          <Link
            href={headerLinkHref}
            className="text-sm font-medium hover:underline"
          >
            {headerLinkText}
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
              {headerText}
            </h1>
            <p className="text-sm text-zinc-500">{headerSubText}</p>
          </div>

          <div className="grid gap-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
