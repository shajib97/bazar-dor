import Image from "next/image";

export default function Banner() {
  return (
    <section className="grid items-center gap-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 md:grid-cols-2 md:p-10">
      <div>
        <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
          আজকের বাজার দর
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="btn btn-sm mt-6 border-[#07883e] bg-[#07883e] text-white hover:bg-[#066c32] sm:btn-md"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="flex justify-center">
        <Image
          src="/bazar-hero.png"
          alt="তাজা বাজারের ঝুড়ি"
          width={400}
          height={350}
          priority
          className="h-auto w-full max-w-sm"
        />
      </div>
    </section>
  );
}
