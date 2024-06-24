import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { Payroll } from '@/types/payroll';
import PayrollList from './payroll-list';
import { Employee } from "../../../../types/employee";

export default async function Page() {

  const session = await auth() as any;

  if (!session && !session?.user) redirect("/login");


  const accessToken = session.user.access_token;

  if (!accessToken) redirect("/login");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}payroll`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let payroll: Payroll[];

  if (!res.ok) return (
    <main>
      <h1>Something went wrong</h1>
      <pre>{JSON.stringify(await res.json())}</pre>
    </main>
  )

  payroll = await res.json();

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const employees: Employee[] = await res2.json();

  if (payroll.length > 0)
    payroll.forEach(pay => {
      const employee = employees.find(e => e.id === pay.employee_id);
      pay.employee_name = `${employee?.firstname} ${employee?.lastname}`;
    });

  return (
    <main className="flex flex-col min-h-screen w-full gap-4">
      <PayrollList accessToken={accessToken} employees={employees} payroll={payroll} />
    </main>
  )
};
