import { Employee } from '../../../../types/employee';

type TableProps = {
    employees: Employee[];
    selected: number | null;
    onUserSelected: (selected: number | null) => void;
}


export default function Table({
    employees,
    selected,
    onUserSelected: onEmployeeSelected
}: TableProps) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-xs w-full table-zebra-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        {/* based the table from the employee type*/}
                        {
                            /*
                            export type Employee = {
                              id_number: number;
                              firstname: string;
                              lastname: string;
                              middlei: string;
                              address: string;
                              password: string;
                              gender: string;
                              id: number;
                              birthday: string;
                              phone_number: string;
                              employment_status: string;
                              position: string;
                              supervisor_id: string;
                              basic_salary: number;
                            }
                            
                             * */
                        }
                        <th>First Name</th>
                        <th>Middle Initial</th>
                        <th>Last Name</th>
                        <th>Position</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                        <th>Phone Number</th>
                        <th>Employment Status</th>
                        <th>Supervisor ID</th>
                        <th>Basic Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="cursor-pointer hover:opacity-70 active:opacity-80" onClick={() => {
                            if (selected === employee.id) onEmployeeSelected(null);
                            else onEmployeeSelected(employee.id);
                        }}>
                            <th>
                                <div className="form-control">
                                    <input type="checkbox" checked={selected === employee.id} className="checkbox checkbox-accent checkbox-xs" />
                                </div>
                            </th>
                            <th>{employee.id}</th>
                            <td>{`${employee.firstName} ${employee.lastName}`}</td>
                            <td>{employee.position}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.address}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
