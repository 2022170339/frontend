import LoginForm from "../../components/forms/login-form";

export default async function Page() {
  const check = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}`, {
    headers: {
      method: "GET",
    },
  });

  if (!check.ok) return <main className="flex min-h-screen w-full">
    <LoginForm />
  </main>

  return <main className="flex min-h-screen w-full">
    <LoginForm />
  </main>
}
