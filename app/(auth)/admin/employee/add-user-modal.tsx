"use client"

import { useRef } from "react";
import { CreateEmployee, Employee } from "../../../../types/employee";
import { PiCalendar, PiIdentificationBadgeFill, PiIdentificationCardFill, PiLockKeyFill, PiMapPinAreaFill, PiMoneyFill, PiPhoneFill } from "react-icons/pi";
import { useForm } from "react-hook-form";

export default function AddUserModal({
    employees,
    lastIdNumber,
    accessToken,
}: {
    employees: Employee[];
    lastIdNumber: number;
    accessToken: string;
}) {
    const modalRef = useRef<HTMLDialogElement>(null);

    const {
        register,
        handleSubmit,
    } = useForm<CreateEmployee>();

    const onSubmit = async (data: CreateEmployee) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            console.error('Failed to create employee');
            const error = await res.json();
            console.error(error);
        }

        modalRef?.current?.close();
        window.location.reload();
    }

    return (
        <>
            <button onClick={() => modalRef?.current?.showModal()} className="btn btn-success w-full btn-xs">Add User</button>
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add User</h3>
                    <p className="py-4">Please fill the form below to create a new user</p>
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        <div className="mb-2">
                            User Credentials
                        </div>

                        {/* ID Number */}
                        <label className="input input-bordered input-sm input-disabled flex items-center gap-2 mb-2">
                            <PiIdentificationBadgeFill />
                            <input type="number" {...register("id_number")} className="grow" value={lastIdNumber} readOnly required />
                        </label>

                        {/* Password */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiLockKeyFill />
                            <input type="password" {...register("password")} className="grow" placeholder="password" required />
                        </label>


                        <div className="mt-4 mb-2">
                            Employee Details
                        </div>

                        {/* First Name */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiIdentificationCardFill />
                            <input type="text" {...register("firstname")} className="grow" placeholder="first name" required />
                        </label>

                        {/* Middle Initial */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiIdentificationCardFill />
                            <input type="text" {...register("middlei")} className="grow" placeholder="middle initial" required />
                        </label>

                        {/* Last Name */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiIdentificationCardFill />
                            <input type="text" {...register("lastname")} className="grow" placeholder="last name" required />
                        </label>

                        {/* Address */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiMapPinAreaFill />
                            <input type="text" {...register("address")} className="grow" placeholder="address" required />
                        </label>

                        {/* Gender */}
                        <select {...register("gender")} className="select select-bordered w-full select-sm border rounded-lg my-1" required>
                            <option disabled selected>gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>

                        {/* Birthday */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiCalendar />
                            <input type="date" {...register("birthday")} className="grow" placeholder="birthday" required />
                        </label>

                        {/* Phone Number */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiPhoneFill />
                            <input type="text" {...register("phone_number")} className="grow" placeholder="phone number" required />
                        </label>

                        {/* Employment Status */}
                        <select {...register("employment_status")} className="select select-bordered w-full select-sm border rounded-lg my-1" required>
                            <option disabled selected>employment status</option>
                            <option value="Regular">Regular</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contractual">Contractual</option>
                        </select>

                        {/* Position */}
                        <select {...register("position")} className="select select-bordered w-full select-sm border rounded-lg my-1" required>
                            <option disabled selected>position</option>
                            <option value="Chief Executive Officer">Chief Executive Officer</option>
                            <option value="Chief Operating Officer">Chief Operating Officer</option>
                            <option value="Chief Finance Officer">Chief Finance Officer</option>
                            <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                            <option value="IT Operations and Systems">IT Operations and Systems</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="HR Team Leader">HR Team Leader</option>
                            <option value="HR Rank and File">HR Rank and File</option>
                            <option value="Accounting Head">Accounting Head</option>
                            <option value="Payroll Manager">Payroll Manager</option>
                            <option value="Payroll Team Leader">Payroll Team Leader</option>
                            <option value="Payroll Rank and File">Payroll Rank and File</option>
                            <option value="Account Manager">Account Manager</option>
                            <option value="Account Team Leader">Account Team Leader</option>
                            <option value="Account Rank and File">Account Rank and File</option>
                        </select>

                        {/* Supervisor ID */}
                        <select {...register("supervisor_id")} className="select select-bordered w-full select-sm border rounded-lg my-1" required>
                            <option disabled selected>supervisor</option>
                            {
                                employees.map(employee => (
                                    <option key={employee.id} value={employee.id_number}>[{employee.position}]: {employee.firstname} {employee.lastname}</option>
                                ))
                            }
                        </select>

                        {/* Basic Salary */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiMoneyFill />
                            <input type="number" {...register("basic_salary")} className="grow" placeholder="basic salary" required />
                        </label>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-success">Create Employee</button>
                            <button type="button" onClick={() => modalRef?.current?.close()} className="btn btn-error">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}
