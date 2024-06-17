import { redirect } from "next/navigation";
import { auth } from "../../auth";
import LoginForm from "../../components/forms/login-form";

export default async function Page() {
  const session = await auth();

  if (session) redirect('/admin');

  return <main className="flex min-h-screen w-full">
    <LoginForm />
  </main>
}
