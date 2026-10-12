import Banner from "../components/Banner";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <Banner />

      <section id="সব-পণ্য" className="mt-10">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>

        <p className="mt-2 text-gray-500">
          প্রয়োজনীয় পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </section>
    </main>
  );
}
