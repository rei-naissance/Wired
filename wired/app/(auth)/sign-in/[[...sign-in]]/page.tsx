// Custom sign-in page
"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background pattern-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted">Sign in to your account to continue</p>
        </div>
        <div className="card-pattern rounded-xl p-6 sm:p-8">
          <SignIn 
            appearance={{
              elements: {
                card: "bg-card-background border-0 shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-card-background border border-card-border text-foreground hover:bg-[#111111] rounded-lg py-2 font-medium transition-colors duration-200",
                socialButtonsBlockButtonText: "text-foreground font-medium ml-2",
                dividerLine: "bg-card-border",
                dividerText: "text-muted font-medium",
                formFieldLabel: "text-foreground font-medium mb-2 block",
                formFieldInput: "bg-card-background border border-card-border text-foreground rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200",
                formButtonPrimary: "bg-primary text-black hover:bg-primary-hover rounded-lg py-3 font-medium w-full transition-colors duration-200 mt-4",
                footer: "hidden",
                formFieldSuccess: "text-green-500",
                formFieldError: "text-red-500",
                identityPreviewText: "text-foreground",
                identityPreviewEditButton: "text-primary hover:text-primary-hover",
              },
            }}
            routing="hash"
            signUpUrl="/sign-up"
          />
          
          <div className="mt-6 text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:text-primary-hover font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}