"use client";

import { useEffect, useState } from "react";
import ProductCard, { type Product } from "./ProductCard";

export default function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
        );

        if (!res.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch {
        setError("পণ্যের তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div
        role="status"
        aria-label="পণ্য লোড হচ্ছে"
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton h-36 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="mt-10 text-red-600">
        {error}
      </p>
    );
  }

  if (products.length === 0) {
    return <p className="mt-10 text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>;
  }

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const sortedProducts = [...products];

  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="text-xl font-bold">
          <span className="text-green-600">▲</span> আজ দাম বেড়েছে
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">
          <span className="text-red-600">▼</span> আজ দাম কমেছে
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-products" className="text-sm text-gray-500">
              সাজান
            </label>

            <select
              id="sort-products"
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
    </div>
  );
}
