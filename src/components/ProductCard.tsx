import Link from "next/link";

export interface Product {
  id: number;
  slug: string;
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

export default function ProductCard({ product }: { product: Product }) {
  const { dir, pct } = product.change;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-green-600 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
          {product.image}
        </span>

        <div>
          <h3 className="font-semibold">{product.nameBn}</h3>

          <p className="text-sm text-gray-500">প্রতি {units[product.unit]}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">আজকের দাম</p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <p>
          <span className="text-xl font-bold">
            {product.today.toLocaleString("bn-BD")}
          </span>{" "}
          টাকা
        </p>

        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            dir === "up"
              ? "bg-green-50 text-green-600"
              : dir === "down"
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {dir === "up" ? "▲" : dir === "down" ? "▼" : "—"}{" "}
          {pct.toLocaleString("bn-BD", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
          %
        </span>
      </div>
    </Link>
  );
}
