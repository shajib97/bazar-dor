"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: "kg" | "litre" | "dozen" | "piece";
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const units = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
        );

        if (!res.ok) {
          throw new Error("দামের তথ্য লোড করা যায়নি।");
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch {
        setError("দামের তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      aria-label="পণ্যের দাম পরিবর্তনের তালিকা"
      className="overflow-hidden border-t border-gray-200 bg-white py-2"
    >
      {loading ? (
        <div className="mx-auto flex max-w-6xl gap-4 px-4">
          <div className="skeleton h-5 w-48" />
          <div className="skeleton h-5 w-48" />
          <div className="skeleton h-5 w-48" />
        </div>
      ) : error ? (
        <p role="alert" className="px-4 text-sm text-red-600">
          {error}
        </p>
      ) : (
        <Marquee speed={50} pauseOnHover gradient={false}>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-2 whitespace-nowrap border-r border-gray-200 px-5 text-sm"
            >
              <span>{product.image}</span>
              <span>{product.nameBn}</span>

              <span className="text-gray-600">
                {product.today.toLocaleString("bn-BD")} টাকা/
                {units[product.unit]}
              </span>

              <span
                className={`font-semibold ${
                  product.change.dir === "up"
                    ? "text-green-600"
                    : product.change.dir === "down"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {product.change.pct.toLocaleString("bn-BD", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
                %
              </span>
            </div>
          ))}
        </Marquee>
      )}
    </div>
  );
}
