"use client"

import { useState } from "react";
import AddUserModal from "./add-user-modal";
import Table from "./table";
import { Employee } from "../../../../types/employee";
import EditUserModal from "./edit-user-modal";


export interface EmployeeListProps {
    employees: Employee[];
    accessToken: string;
}

export default function EmployeeList({
    employees,
    accessToken
}: EmployeeListProps) {
    const [selected, setSelected] = useState<number | null>(null);

    const largestIdNumber = employees.map(employee => employee.id_number).sort((a, b) => b - a)[0];

    return (
        <div suppressHydrationWarning>
            <div className="grid grid-cols-6 w-full items-end justify-end gap-2 sticky top-0 z-10 shadow-md bg-base-100 py-2">
                <div className="col-span-1">
                    <AddUserModal
                        accessToken={accessToken}
                        lastIdNumber={largestIdNumber + 1} employees={employees} />
                </div>
                {
                    selected && (
                        <>
                            <div className="col-span-1">
                                <EditUserModal
                                    accessToken={accessToken}
                                    selectedEmployee={employees.find(employee => employee.id === selected) ?? null}
                                    employees={employees}
                                />
                            </div>
                            <div className="col-span-1">
                                <button onClick={async () => {
                                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee/${selected}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            "Authorization": `Bearer ${accessToken}`
                                        }
                                    });

                                    if (!res.ok) {
                                        console.error('Failed to delete employee');
                                        const error = await res.json();
                                        console.error(error);
                                    }

                                    window.location.reload();
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
                    setTimeout(() => {
                        setSelected(id)
                    }, 200);
                }}
            />
        </div>
    )
}
