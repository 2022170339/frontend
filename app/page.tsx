import { redirect } from "next/navigation";
import { auth } from "../auth";

export default async function Home() {
  const session = await auth();
  if (!session) return redirect("/login");

  console.log(session);

  return (
    <main className="flex min-h-screen w-full">
      Home Page
    </main>
  );
}
