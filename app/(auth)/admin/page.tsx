import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function Page() {
  const session = await auth() as any;

  if (!session && !session.user) redirect('/login');

  const accessToken = session.user.access_token;

  if (!accessToken) redirect('/login');

  redirect('/admin/employee');
}
