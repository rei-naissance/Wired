// Custom sign-up page
"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  // When Clerk signs the user in after sign-up, automatically navigate to settings for profile completion
  useEffect(() => {
    if (!isLoaded) return;
    if (user) {
      setRedirecting(true);
      // small timeout to allow Clerk client to settle, then redirect
      const t = setTimeout(() => router.push("/settings"), 300);
      return () => clearTimeout(t);
    }
  }, [user, isLoaded, router]);

  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background pattern-bg p-4">
        <div className="text-center">
          <p className="text-foreground">Account created — completing setup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background pattern-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted">Join us today to get started</p>
        </div>
        <div className="card-pattern rounded-xl p-6 sm:p-8">
          <SignUp 
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
              },
            }}
            routing="hash"
            signInUrl="/sign-in"
          />
          
          <div className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:text-primary-hover font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}