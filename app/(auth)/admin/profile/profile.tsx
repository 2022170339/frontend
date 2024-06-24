"use client";
import { EmployeeProfile } from "@/types/employee";


export default function ProfilePage({
  employee
}: {
  employee: EmployeeProfile
}) {
  return (

    <div className="dark:bg-zinc-800 shadow-md rounded-lg w-[60%]">
      <div className="p-4">

        <div className="flex">

          <div className="mt-4 w-1/2 pr-4 border-r border-zinc-200 dark:border-zinc-700">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-2">{employee?.lastname}, {employee?.firstname} {employee.middlei}.</h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-1"><strong>ID:</strong> {employee?.id_number}</p>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-1"><strong>Phone:</strong> {employee?.phone_number}</p>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-1"><strong>Position:</strong> {employee?.position}</p>
            <p className="text-base text-zinc-600 dark:text-zinc-400"><strong>Basic Salary:</strong> {employee?.basic_salary}</p>
          </div>

          <div className="mt-4 w-1/2 pl-4 relative triangle">
            <br />
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-1"><strong>Gender:</strong> {employee?.gender === 'M' ? 'Male' : employee?.gender === 'F' ? 'Female' : null}
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-1"><strong>Birthday:</strong> {employee?.birthday}</p>
            <p className="text-base text-zinc-600 dark:text-zinc-400"><strong>Address:</strong> {employee?.address}</p>

          </div>

        </div>

      </div>
    </div>





  )
}
