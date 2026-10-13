"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

export default function SocialLoginButtons({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  const handleSocialLogin = async (provider: "google" | "github") => {
    setLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/?social=success",
        errorCallbackURL: "/signin?reason=social-error",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি।");
      }
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <div className="divider text-sm">অথবা</div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          disabled={disabled || loading !== null}
          className="btn btn-outline h-auto min-h-10 gap-2 py-2 text-sm"
        >
          {loading === "google" ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <FcGoogle className="shrink-0 text-lg" />
          )}

          <span>Google দিয়ে চালিয়ে যান</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          disabled={disabled || loading !== null}
          className="btn btn-outline h-auto min-h-10 gap-2 py-2 text-sm"
        >
          {loading === "github" ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <FaGithub className="shrink-0 text-lg" />
          )}

          <span>GitHub দিয়ে চালিয়ে যান</span>
        </button>
      </div>
    </div>
  );
}
