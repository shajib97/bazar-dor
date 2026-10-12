import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=login-required");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-2xl font-bold">আমার প্রোফাইল</h1>

      <div className="mx-auto mt-6 max-w-md rounded-2xl border border-gray-200 bg-white p-6">
        <div>
          <p className="text-sm text-gray-500">নাম</p>
          <p className="mt-1 text-lg font-semibold">{session.user.name}</p>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">ইমেইল</p>
          <p className="mt-1 break-all">{session.user.email}</p>
        </div>

        <Link
          href="/profile/update"
          className="btn mt-6 w-full border-[#07883e] bg-[#07883e] text-white hover:bg-[#066c32]"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </main>
  );
}
