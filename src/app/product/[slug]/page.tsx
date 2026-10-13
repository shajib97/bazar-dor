import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import type { Product } from "../../../components/ProductCard";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetails extends Product {
  category: string;
  categoryNameBn: string;
  markets: Market[];
}

const units = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const productsRes = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!productsRes.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const products: Product[] = await productsRes.json();
  const selectedProduct = products.find((product) => product.slug === slug);

  if (!selectedProduct) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=login-required");
  }

  const productRes = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${selectedProduct.id}`,
    { cache: "no-store" },
  );

  if (productRes.status === 404) {
    notFound();
  }

  if (!productRes.ok) {
    throw new Error("পণ্যের বিস্তারিত তথ্য লোড করা যায়নি।");
  }

  const product: ProductDetails = await productRes.json();
  const markets = product.markets;

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : null;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : null;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0,
      ) / markets.length
    : null;

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:py-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl">
            {product.image}
          </span>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>

            <p className="mt-2 text-gray-500">
              বিভিন্ন বাজারে আজকের দাম ও দামের তুলনা।
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <Link
            href={`/category/${product.category}`}
            className="rounded-full bg-green-50 px-3 py-1 text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span className="text-gray-500">প্রতি {units[product.unit]}</span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

            <p className="mt-2 text-2xl font-bold">
              {minPrice === null
                ? "—"
                : `${minPrice.toLocaleString("bn-BD")} টাকা`}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">সর্বাধিক দাম</p>

            <p className="mt-2 text-2xl font-bold">
              {maxPrice === null
                ? "—"
                : `${maxPrice.toLocaleString("bn-BD")} টাকা`}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">গড় দাম</p>

            <p className="mt-2 text-2xl font-bold">
              {averagePrice === null
                ? "—"
                : `${averagePrice.toLocaleString("bn-BD", {
                    maximumFractionDigits: 1,
                  })} টাকা`}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          গড় দাম প্রতিটি বাজারের সর্বনিম্ন ও সর্বাধিক দামের মধ্যমানের গড়
          হিসেবে হিসাব করা হয়েছে।
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>

        <p className="mt-1 text-sm text-gray-500">
          প্রতি {units[product.unit]} — সকল দাম টাকায়
        </p>

        {markets.length === 0 ? (
          <p className="mt-4 text-gray-500">
            বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন দাম</th>
                  <th>সর্বাধিক দাম</th>
                  <th>গড় দাম</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market) => (
                  <tr key={`${market.division}-${market.market}`}>
                    <td className="whitespace-nowrap">{market.market}</td>
                    <td className="whitespace-nowrap">{market.division}</td>
                    <td>{market.min.toLocaleString("bn-BD")}</td>
                    <td>{market.max.toLocaleString("bn-BD")}</td>
                    <td>
                      {((market.min + market.max) / 2).toLocaleString("bn-BD", {
                        maximumFractionDigits: 1,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Link href="/" className="inline-block text-green-700 underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
