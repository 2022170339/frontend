import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import Payslip from "../payslip";
import { Payroll } from "../../../../../types/payroll";
import { Employee } from "../../../../../types/employee";

export default async function Page({
  params
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth() as any;

  if (!session && !session?.user) redirect("/login");

  const accessToken = session.user.access_token;

  if (!accessToken) redirect("/login");


  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}payroll`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch payroll data');
  }

  const payroll: Payroll[] = await res.json();

  let payslip = payroll.find(p => p.id === Number(params.id));

  if (!payslip) redirect("/payroll");

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res2.ok) {
    throw new Error('Failed to fetch employee data');
  }

  const employees: Employee[] = await res2.json();

  const employee = employees.find(e => e.id === payslip.employee_id);

  payslip.employee_name = `${employee?.firstname} ${employee?.lastname}`;

  return (
    <Payslip payslip={payslip} />
  )
}
