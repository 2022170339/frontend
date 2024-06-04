import { auth } from "../../../auth";

export default async function Page() {
  const session = await auth();

  console.log(session);

  return <main className="flex min-h-screen w-full">
    Hello User!
  </main>
}
