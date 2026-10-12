"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("reason") === "login-required") {
      toast.error("বিস্তারিত দাম দেখতে আগে সাইন ইন করুন।", {
        id: "login-required",
      });
    }
  }, []);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা দিন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>

        <p className="mt-2 text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <form
        onSubmit={handleSignIn}
        noValidate
        className="mx-auto mt-6 max-w-md space-y-4 rounded-2xl border border-gray-200 bg-white p-6"
      >
        <div>
          <label htmlFor="email" className="mb-2 block text-sm">
            ইমেইল
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="input w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm">
            পাসওয়ার্ড
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            required
            className="input w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-[#07883e] bg-[#07883e] text-white hover:bg-[#066c32]"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              সাইন ইন হচ্ছে...
            </>
          ) : (
            "সাইন ইন"
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-green-700 underline">
            সাইন আপ করুন
          </Link>
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-500 underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
