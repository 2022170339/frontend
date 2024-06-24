"use client"

import { useRef } from "react";
import { Employee, UpdateEmployee } from "../../../../types/employee";
import { PiIdentificationCardFill, PiMapPinAreaFill } from "react-icons/pi";
import { useForm } from "react-hook-form";

export default function EditUserModal({
    selectedEmployee,
    accessToken,
}: {
    selectedEmployee: Employee | null;
    employees: Employee[];
    accessToken: string;
}) {
    const modalRef = useRef<HTMLDialogElement>(null);

    const {
        register,
        handleSubmit,
    } = useForm<UpdateEmployee>({
        defaultValues: {
            ...selectedEmployee
        }
    });

    const onSubmit = async (data: UpdateEmployee) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            console.error('Failed to update employee');
            const error = await res.json();
            console.error(error);
        }

        modalRef?.current?.close();
        window.location.reload();
    }

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
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        <input type="number" className="grow" readOnly {...register('id')} hidden />

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
