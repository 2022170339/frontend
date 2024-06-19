import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { EmployeeProfile } from "@/types/employee";
import ProfilePage from "./profile";


export default async function Page() {

  const session = await auth() as any;

  if (!session && !session?.user) redirect("/login");

  const accessToken = session.user.access_token;

  if (!accessToken) redirect("/login");

  const userID = session.user.id;

  const ID = String(userID).slice(-2);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee/${ID}`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const employee: EmployeeProfile[] = await res.json();

  console.log(employee);
  console.log(ID);

  return (

    <div className="container mx-auto p-4 flex justify-center items-center relative">
      <ProfilePage employee={employee} />
    </div>






    
  )
};
