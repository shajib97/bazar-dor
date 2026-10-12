import Banner from "../components/Banner";
import ProductSections from "../components/ProductSections";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <Banner />
      <ProductSections />
    </main>
  );
}
