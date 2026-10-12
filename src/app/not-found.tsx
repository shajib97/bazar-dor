import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-green-700">৪০৪</p>

      <h1 className="mt-4 text-2xl font-bold">পেজ পাওয়া যায়নি</h1>

      <p className="mt-2 text-gray-500">
        আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
      </p>

      <Link
        href="/"
        className="btn mt-6 border-[#07883e] bg-[#07883e] text-white hover:bg-[#066c32]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
