"use client"

import { useRef } from "react";
import { createEmployee } from './action';
import { useFormState } from "react-dom";
import { Employee } from "../../../../types/employee";
import { PiIdentificationBadgeFill, PiLockKeyFill, PiUserFill } from "react-icons/pi";

export default function AddUserModal({
    employees,
    lastIdNumber
}: {
    employees: Employee[];
    lastIdNumber: number;
}) {

    const [_, formAction] = useFormState(createEmployee, {});
    const modalRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <button onClick={() => modalRef?.current?.showModal()} className="btn btn-success w-full btn-xs">Add User</button>
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add User</h3>
                    <p className="py-4">Please fill the form below to create a new user</p>
                    <form action={formAction} method="dialog">
                        <div className="mb-2">
                            User Credentials
                        </div>

                        {/* ID Number */}
                        <label className="input input-bordered input-sm input-disabled flex items-center gap-2 mb-2">
                            <PiIdentificationBadgeFill />
                            <input type="number" name="id_number" className="grow" value={lastIdNumber} readOnly required />
                        </label>

                        {/* Username */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiUserFill />
                            <input type="text" name="username" className="grow" placeholder="username" required />
                        </label>

                        {/* Password */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiLockKeyFill />
                            <input type="password" name="password" className="grow" placeholder="password" required />
                        </label>


                        <div className="mt-4 mb-2">
                            Employee Details
                        </div>

                        {/* First Name */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            First Name
                            <input type="text" name="firstname" className="grow" placeholder="first name" required />
                        </label>

                        {/* Middle Initial */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            Middle Initial
                            <input type="text" name="middlei" className="grow" placeholder="middle initial" required />
                        </label>

                        {/* Last Name */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            Last Name
                            <input type="text" name="lastname" className="grow" placeholder="last name" required />
                        </label>

                        {/* Address */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            Address
                            <input type="text" name="address" className="grow" placeholder="address" required />
                        </label>

                        {/* Gender */}
                        <select name="gender" className="select select-bordered w-full select-sm border rounded-lg my-1" required>
                            <option disabled selected>gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>

                        {/* Birthday */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <input type="date" name="birthday" className="grow" placeholder="birthday" required />
                        </label>

                        {/* Phone Number */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            Phone Number
                            <input type="text" name="phone_number" className="grow" placeholder="phone number" required />
                        </label>

                        {/* Employment Status */}
                        <select name="employment_status" className="select select-bordered w-full select-sm border rounded-lg my-1" required>
                            <option disabled selected>employment status</option>
                            <option value="Regular">Regular</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contractual">Contractual</option>
                        </select>

                        {/* Position */}
                        <select name="position" className="select select-bordered w-full select-sm border rounded-lg my-1" required>
                            <option disabled selected>position</option>
                            <option value="Administrator">Administrator</option>
                            <option value="Chief Executive Officer">Chief Executive Officer</option>
                            <option value="Chief Finance Officer">Chief Finance Officer</option>
                            <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                            <option value="IT Operations and Systems">IT Operations and Systems</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="HR Team Leader">HR Team Leader</option>
                            <option value="HR Rank and File">HR Rank and File</option>
                            <option value="Accounting Head">Accounting Head</option>
                            <option value="Payroll Manager">Payroll Manager</option>
                            <option value="Payroll Rank and File">Payroll Rank and File</option>
                            <option value="Account Manager">Account Manager</option>
                            <option value="Account Team Leader">Account Team Leader</option>
                            <option value="Account Rank and File">Account Rank and File</option>
                        </select>

                        {/* Supervisor ID */}
                        <select name="supervisor_id" className="select select-bordered w-full select-sm border rounded-lg my-1" required>
                            <option disabled selected>supervisor</option>
                            {
                                employees.map(employee => (
                                    <option key={employee.id} value={employee.id}>{employee.firstname} {employee.lastname}</option>
                                ))
                            }
                        </select>

                        {/* Basic Salary */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            Basic Salary
                            <input type="number" name="basic_salary" className="grow" placeholder="basic salary" required />
                        </label>

                        <div className="modal-action">
                            <button className="btn btn-success">Create Employee</button>
                            <button onClick={() => modalRef?.current?.close()} className="btn btn-error">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}
