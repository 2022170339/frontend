"use client"

import { useRef } from "react";
import { updateEmployee } from './action';
import { useFormState } from "react-dom";
import { Employee, UpdateEmployee } from "../../../../types/employee";
import { PiCalendar, PiIdentificationBadgeFill, PiIdentificationCardFill, PiMapPinAreaFill, PiMoneyFill, PiPhoneFill, PiUserFill } from "react-icons/pi";
import { useForm } from "react-hook-form";

export default function EditUserModal({
    selectedEmployee,
    employees,
}: {
    selectedEmployee: Employee | null;
    employees: Employee[];
}) {
    const [_, formAction] = useFormState(updateEmployee, {});
    const modalRef = useRef<HTMLDialogElement>(null);

    const {
        register
    } = useForm<UpdateEmployee>({
        defaultValues: {
            ...selectedEmployee
        }
    });

    return (
        <>
            <button onClick={() => {
                if (selectedEmployee) {
                    modalRef?.current?.showModal();
                }
            }} className="btn btn-warning w-full btn-xs">Edit User</button>
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit User</h3>
                    <p className="py-4">Please fill the form below to create a new user</p>
                    <form action={formAction} method="dialog">
                        <div className="mb-2">
                            User Credentials
                        </div>

                        <input type="number" className="grow" readOnly {...register('id')} hidden />

                        {/* ID Number */}
                        <label className="input input-bordered input-sm input-disabled flex items-center gap-2 mb-2">
                            <PiIdentificationBadgeFill />
                            <input type="number" className="grow" readOnly {...register('id_number')} />
                        </label>

                        <div className="mt-4 mb-2">
                            Employee Details
                        </div>

                        {/* First Name */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiIdentificationCardFill />
                            <input type="text" className="grow" placeholder="first name" {...register('firstname')} />
                        </label>

                        {/* Middle Initial */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiIdentificationCardFill />
                            <input type="text" className="grow" placeholder="middle initial" {...register('middlei')} />
                        </label>

                        {/* Last Name */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiIdentificationCardFill />
                            <input type="text" className="grow" placeholder="last name" {...register('lastname')} />
                        </label>

                        {/* Address */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiMapPinAreaFill />
                            <input type="text" className="grow" placeholder="address" {...register('address')} />
                        </label>

                        {/* Gender */}
                        <select {...register('gender')} className="select select-bordered w-full select-sm border rounded-lg my-1" >
                            <option disabled selected>gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>

                        {/* Birthday */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiCalendar />
                            <input type="date" className="grow" placeholder="birthday" {...register('birthday')} />
                        </label>

                        {/* Phone Number */}
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                            <PiPhoneFill />
                            <input type="text" className="grow" placeholder="phone number" {...register('phone_number')} />
                        </label>

                        {/* Employment Status */}
                        <select {...register('employment_status')} className="select select-bordered w-full select-sm border rounded-lg my-1">
                            <option disabled selected>employment status</option>
                            <option value="Regular">Regular</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contractual">Contractual</option>
                        </select>

                        {/* Position */}
                        <select {...register('position')} className="select select-bordered w-full select-sm border rounded-lg my-1">
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
                        <select {...register('supervisor_id')} className="select select-bordered w-full select-sm border rounded-lg my-1">
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
                            <input type="number" className="grow" placeholder="basic salary" {...register('basic_salary')} />
                        </label>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-warning">Update Employee</button>
                            <button type="button" onClick={() => modalRef?.current?.close()} className="btn btn-error">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}
