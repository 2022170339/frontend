import { Payroll } from '@/types/payroll';

type TableProps = {
    payroll: Payroll[];
    selected: number | null;
    onPayslipSelected: (selected: number | null) => void;
}


export default function Table({
    payroll,
    selected,
    onPayslipSelected
}: TableProps) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-xs w-full table-zebra-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Employee Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Gross Pay</th>
                        <th>Net Pay</th>
                        <th>Total Deductions</th>
                        <th>Total Perks</th>
                        <th>Basic Salary</th>
                        <th>Days</th>
                        <th>Take Home</th>
                        <th>Total Hours</th>
                        <th>Overtime</th>
                    </tr>
                </thead>
                <tbody>
                    {payroll.map((payslip) => (
                        <tr key={payslip.id} className="cursor-pointer hover:opacity-70 active:opacity-80" onClick={() => {
                            if (selected === payslip.id) onPayslipSelected(null);
                            else onPayslipSelected(payslip.id);
                        }}>
                            <th>
                                <div className="form-control">
                                    <input type="checkbox" checked={selected === payslip.id} className="checkbox checkbox-accent checkbox-xs" />
                                </div>
                            </th>
                            <th>{payslip.id}</th>
                            <th>{payslip.employee_name}</th>
                            <th>{payslip.start_date}</th>
                            <th>{payslip.end_date}</th>
                            <th>{payslip.gross_pay}</th>
                            <th>{payslip.net_pay}</th>
                            <th>{payslip.total_deductions}</th>
                            <th>{payslip.total_perks}</th>
                            <th>{payslip.basic_salary}</th>
                            <th>{payslip.days}</th>
                            <th>{payslip.take_home}</th>
                            <th>{payslip.total_hours}</th>
                            <th>{payslip.overtime}</th>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Employee Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Gross Pay</th>
                        <th>Net Pay</th>
                        <th>Total Deductions</th>
                        <th>Total Perks</th>
                        <th>Basic Salary</th>
                        <th>Days</th>
                        <th>Take Home</th>
                        <th>Total Hours</th>
                        <th>Overtime</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
