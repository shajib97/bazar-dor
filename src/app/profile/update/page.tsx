import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import UpdateProfileForm from "../../../components/UpdateProfileForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=login-required");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-2xl font-bold">
        প্রোফাইলের তথ্য আপডেট করুন
      </h1>

      <UpdateProfileForm name={session.user.name} />
    </main>
  );
}
