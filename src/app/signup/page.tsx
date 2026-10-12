"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (name.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা দিন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
      router.push("/signin");
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>

        <p className="mt-2 text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <form
        onSubmit={handleSignUp}
        noValidate
        className="mx-auto mt-6 max-w-md space-y-4 rounded-2xl border border-gray-200 bg-white p-6"
      >
        <div>
          <label htmlFor="name" className="mb-2 block text-sm">
            নাম
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="যেমন: রহিম উদ্দিন"
            required
            className="input w-full"
          />
        </div>

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
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            required
            className="input w-full"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="আবার লিখুন"
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
              তৈরি হচ্ছে...
            </>
          ) : (
            "অ্যাকাউন্ট তৈরি করুন"
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-green-700 underline">
            সাইন ইন করুন
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
