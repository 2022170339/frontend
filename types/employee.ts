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
  supervisor_id: number;
  basic_salary: number;
}


export type CreateEmployee = {
  firstname: string;
  lastname: string;
  middlei: string;
  address: string;
  id_number: number;
  password: string;
  gender: string;
  birthday: string;
  phone_number: string;
  employment_status: string;
  position: string;
  supervisor_id: number;
  basic_salary: number;
};

export type UpdateEmployee = {
  id: number;
  firstname: string;
  lastname: string;
  middlei: string;
  address: string;
};

export type EmployeeProfile = {
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
