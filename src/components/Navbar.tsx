"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import PriceTicker from "./PriceTicker";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function Navbar({ date }: { date: string }) {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
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
          <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn btn-sm border-[#07883e] bg-[#07883e] text-white hover:bg-[#066c32] sm:btn-md"
          >
            সাইন আপ
          </Link>
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
