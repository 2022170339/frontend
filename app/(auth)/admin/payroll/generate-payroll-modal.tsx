"use client"

import { useRef } from "react";
import { generateEmployeePayslip } from './action';
import { useFormState } from "react-dom";
import { PiCalendar } from "react-icons/pi";
import { endOfMonth, startOfMonth, format } from "date-fns";
import { Employee } from "../../../../types/employee";

export default function GeneratePayrollModal({
  employees
}: {
  employees: Employee[];
}) {
  const [state, formAction] = useFormState(generateEmployeePayslip, {});
  const modalRef = useRef<HTMLDialogElement>(null);

  const defaultStartDate = format(startOfMonth(new Date()), "yyy-MM-dd");
  const defaultEndDate = format(endOfMonth(new Date()), "yyyy-MM-dd");

  return (
    <>
      <button onClick={() => modalRef?.current?.showModal()} className="btn btn-success w-full btn-xs">Generate Payroll</button>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Generate payroll</h3>
          <form action={formAction} method="dialog">
            <select name="id" className="select select-bordered w-full select-sm border rounded-lg my-1" required>
              <option disabled selected>employees</option>
              {
                employees?.map(employee => (
                  <option key={employee.id} value={employee.id}>{employee.firstname} {employee.lastname}</option>
                ))
              }
            </select>

            <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
              <PiCalendar />
              Start Date
              <input type="date" name="start_date" className="grow" placeholder="start date" required defaultValue={defaultStartDate} />
            </label>

            <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
              <PiCalendar />
              End Date
              <input type="date" name="end_date" className="grow" placeholder="end date" required defaultValue={defaultEndDate} />
            </label>

            <span className="text-red-500">
              {state && state?.detail && state.detail}
            </span>

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
