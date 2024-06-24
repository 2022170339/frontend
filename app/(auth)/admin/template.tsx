import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function Template({ children }: { children: React.ReactNode }) {
  const session = await auth();

  console.log(session);
  if (!session) redirect('/login');

  return children;
}
