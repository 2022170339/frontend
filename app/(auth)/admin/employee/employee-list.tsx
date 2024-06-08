"use client"

import { useState } from "react";
import AddUserModal from "./add-user-modal";
import Table from "./table";
import { Employee } from "../../../../types/employee";


export interface EmployeeListProps {
    employees: Employee[];
}

export default function EmployeeList({
    employees
}: EmployeeListProps) {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div suppressHydrationWarning>
            <div className="grid grid-cols-6 w-full items-end justify-end gap-2 sticky top-0 z-10 shadow-md bg-base-100 py-2">
                <div className="col-span-1">
                    <AddUserModal />
                </div>
                {
                    selected && (
                        <>
                            <div className="col-span-1">
                                <button className="btn btn-warning w-full btn-xs">Edit User</button>
                            </div>
                            <div className="col-span-1">
                                <button className="btn btn-error w-full btn-xs">Delete User</button>
                            </div>
                        </>
                    )
                }
            </div>
            <Table
                employees={employees}
                selected={selected}
                onUserSelected={(id) => setSelected(id)}
            />
        </div>
    )
}
