"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PriceTicker from "./PriceTicker";
import { authClient } from "../lib/auth-client";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function Navbar({ date }: { date: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [loggingOut, setLoggingOut] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories",
        );

        if (!res.ok) {
          throw new Error("ক্যাটাগরি লোড করা যায়নি।");
        }

        const data: Category[] = await res.json();
        setCategories(data);
      } catch {
        setError("ক্যাটাগরি লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (session && params.get("social") === "success") {
      toast.success("সফলভাবে সাইন ইন হয়েছে।", {
        id: "social-login-success",
      });

      router.replace("/");
    }
  }, [session, router]);

  const handleSignOut = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <Toaster position="top-center" />

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            width={40}
            height={40}
          />

          <div>
            <h2 className="text-xl font-bold sm:text-2xl">বাজার দর</h2>

            <p className="min-h-4 text-[10px] text-gray-500 sm:text-xs">
              {date}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          {isPending ? (
            <div className="skeleton h-8 w-32 sm:h-10" />
          ) : session ? (
            <>
              <Link href="/profile" className="btn btn-ghost btn-sm sm:btn-md">
                প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={loggingOut}
                className="btn btn-sm border-[#07883e] bg-[#07883e] text-white hover:bg-[#066c32] sm:btn-md"
              >
                {loggingOut ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "সাইন আউট"
                )}
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="btn btn-sm border-[#07883e] bg-[#07883e] text-white hover:bg-[#066c32] sm:btn-md"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav aria-label="পণ্য ক্যাটাগরি" className="border-t border-gray-100">
        <div className="mx-auto flex min-h-14 max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2">
          {loading ? (
            <span className="text-sm text-gray-500">
              ক্যাটাগরি লোড হচ্ছে...
            </span>
          ) : error ? (
            <span role="alert" className="text-sm text-red-600">
              {error}
            </span>
          ) : (
            categories.map((category) => {
              const href = `/category/${category.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={category.id}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-[#07883e] text-white" : "hover:bg-green-50"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              );
            })
          )}
        </div>
      </nav>

      <PriceTicker />
    </header>
  );
}
