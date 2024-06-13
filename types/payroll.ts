export type Payroll = {
    id: number;
    employee_id: number;
    employee_name?: string;
    start_date: string;
    end_date: string;
    gross_pay: number;
    net_pay: number;
    total_deductions: number;
    total_perks: number;
    basic_salary: number;
    days: number;
    take_home: number;
    total_hours: number;
    overtime: number;
}
