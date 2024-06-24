import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { EmployeeProfile } from "@/types/employee";
import ProfilePage from "./profile";


export default async function Page() {

  const session = await auth() as any;

  if (!session && !session?.user) redirect("/login");

  const accessToken = session.user.access_token;

  if (!accessToken) redirect("/login");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee/current`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const employee: EmployeeProfile = await res.json();

  return (
    <div className="container mx-auto p-4 flex justify-center items-center relative">
      <ProfilePage employee={employee} />
    </div>
  )
};
