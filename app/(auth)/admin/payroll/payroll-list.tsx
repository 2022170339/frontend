"use client"

import { useState } from "react";
import Table from "./table";
import { Payroll } from "@/types/payroll";
import { useRouter } from "next/navigation";

export default function PayrollList({
  payroll
}: {
  payroll: Payroll[]
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen" suppressHydrationWarning>
      <div className="grid grid-cols-6 w-full items-end justify-end gap-2 sticky top-0 z-10 shadow-md bg-base-100 py-2">
        {
          selected && (
            <div className="col-span-1">
              <button onClick={() => {
                router.push(`/admin/payroll/${selected}`)
              }} className="btn btn-success w-full btn-xs">View Payslip</button>
            </div>
          )
        }
      </div>
      <Table payroll={payroll} selected={selected} onPayslipSelected={setSelected} />
    </div>
  )
}
