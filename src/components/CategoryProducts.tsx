"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard, { type Product } from "./ProductCard";

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products];

  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  if (products.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-500">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>

        <Link
          href="/"
          className="btn mt-4 border-[#07883e] bg-[#07883e] text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-category" className="text-sm text-gray-500">
            সাজান
          </label>

          <select
            id="sort-category"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="select select-sm w-44 bg-white"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
