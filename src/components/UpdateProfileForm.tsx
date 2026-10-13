"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

export default function UpdateProfileForm({ name }: { name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const updatedName = String(formData.get("name") || "").trim();

    if (updatedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
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
          defaultValue={name}
          autoComplete="name"
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
            আপডেট হচ্ছে...
          </>
        ) : (
          "তথ্য আপডেট করুন"
        )}
      </button>

      <Link
        href="/profile"
        className="block text-center text-sm text-green-700 underline"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </form>
  );
}
