"use client"

import { useState } from "react";
import AddUserModal from "./add-user-modal";
import Table from "./table";
import { Employee } from "../../../../types/employee";
import EditUserModal from "./edit-user-modal";
import { deleteEmployee } from "./action";


export interface EmployeeListProps {
    employees: Employee[];
}

export default function EmployeeList({
    employees
}: EmployeeListProps) {
    const [selected, setSelected] = useState<number | null>(null);

    const largestIdNumber = employees.map(employee => employee.id_number).sort((a, b) => b - a)[0];

    return (
        <div suppressHydrationWarning>
            <div className="grid grid-cols-6 w-full items-end justify-end gap-2 sticky top-0 z-10 shadow-md bg-base-100 py-2">
                <div className="col-span-1">
                    <AddUserModal lastIdNumber={largestIdNumber + 1} employees={employees} />
                </div>
                {
                    selected && (
                        <>
                            <div className="col-span-1">
                                <EditUserModal
                                    selectedEmployee={employees.find(employee => employee.id === selected) ?? null}
                                    employees={employees}
                                />
                            </div>
                            <div className="col-span-1">
                                <button onClick={async () => {
                                    await deleteEmployee(selected).then(() => {
                                        window.location.reload();
                                    });
                                }} className="btn btn-error w-full btn-xs">Delete User</button>
                            </div>
                        </>
                    )
                }
            </div>
            <Table
                employees={employees}
                selected={selected}
                onUserSelected={(id) => {
                    setSelected(null);
                    setSelected(id)
                }}
            />
        </div>
    )
}
