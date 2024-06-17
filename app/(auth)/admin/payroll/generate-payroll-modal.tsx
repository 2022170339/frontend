"use client"

import { useRef } from "react";
import { PiCalendar } from "react-icons/pi";
import { endOfMonth, startOfMonth, format } from "date-fns";
import { Employee } from "../../../../types/employee";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function GeneratePayrollModal({
  employees,
  accessToken
}: {
  employees: Employee[];
  accessToken: string;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const defaultStartDate = format(startOfMonth(new Date()), "yyy-MM-dd");
  const defaultEndDate = format(endOfMonth(new Date()), "yyyy-MM-dd");

  const router = useRouter();

  const generateSchema = z.object({
    id: z.string({
      required_error: "Id is required!",
    }).min(1, {
      message: "Id is required!"
    }),
    start_date: z.string({
      required_error: "Start date is required!"
    }),
    end_date: z.string({
      required_error: "End date is required!"
    })
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<{
    id: string | undefined;
    start_date: string;
    end_date: string;
  }>({
    defaultValues: {
      id: undefined,
      start_date: defaultStartDate,
      end_date: defaultEndDate
    },
    resolver: zodResolver(generateSchema)
  })

  const onSubmit = async (data: any) => {
    const { id, start_date, end_date } = data;

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}payroll/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        start_date,
        end_date
      })
    }).then(async (res) => {
      const { id: payrollId } = await res.json();
      router.push(window.location.origin + `/admin/payroll/${payrollId}`);
    }).catch((e) => {
      window.location.reload();
    })

  }

  return (
    <>
      <button onClick={() => modalRef?.current?.showModal()} className="btn btn-success w-full btn-xs">Generate Payroll</button>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Generate payroll</h3>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <select {...register("id")} className="select select-bordered w-full select-sm border rounded-lg my-1" required>
              {
                employees?.map(employee => (
                  <option key={employee.id} value={employee.id}>{employee.firstname} {employee.lastname}</option>
                ))
              }
            </select>

            {errors?.id?.message && (
              <span className="text-red-700">{errors?.id?.message}</span>
            )}

            <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
              <PiCalendar />
              Start Date
              <input type="date" {...register("start_date")} className="grow" placeholder="start date" required defaultValue={defaultStartDate} />
            </label>

            {errors?.start_date?.message && (
              <span className="text-red-700">{errors?.start_date?.message}</span>
            )}

            <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
              <PiCalendar />
              End Date
              <input type="date" {...register("end_date")} className="grow" placeholder="end date" required defaultValue={defaultEndDate} />
            </label>

            {errors?.end_date?.message && (
              <span className="text-red-700">{errors?.end_date?.message}</span>
            )}

            <div className="modal-action">
              <button type="submit" className="btn btn-success">Generate</button>
              <button type="button" onClick={() => modalRef?.current?.close()} className="btn btn-error">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
