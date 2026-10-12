import { notFound } from "next/navigation";
import CategoryProducts from "../../../components/CategoryProducts";
import type { Product } from "../../../components/ProductCard";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categoryRes = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/categories/${encodeURIComponent(slug)}`,
    { cache: "no-store" },
  );

  if (categoryRes.status === 404) {
    notFound();
  }

  if (!categoryRes.ok) {
    throw new Error("ক্যাটাগরির তথ্য লোড করা যায়নি।");
  }

  const category: Category = await categoryRes.json();

  const productsRes = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(category.id)}`,
    { cache: "no-store" },
  );

  if (!productsRes.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const products: Product[] = await productsRes.json();

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-6 sm:py-8">
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6">
        <span className="text-4xl">{category.icon}</span>

        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>

          <p className="mt-1 text-sm text-gray-500">
            {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
            পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts key={category.id} products={products} />
    </main>
  );
}
