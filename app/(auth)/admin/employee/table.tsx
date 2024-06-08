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
                            <th>{employee.id_number}</th>
                            <td>{employee.firstname}</td>
                            <td>{employee.middlei}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.position}</td>
                            <td>{employee.address}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.birthday}</td>
                            <td>{employee.phone_number}</td>
                            <td>{employee.employment_status}</td>
                            <td>{employee.supervisor_id}</td>
                            <td>{employee.basic_salary}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
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
                </tfoot>
            </table>
        </div>
    )
}
