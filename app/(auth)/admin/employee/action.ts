"use server"

import { revalidatePath } from "next/cache";
import { auth } from "../../../../auth";
import { CreateEmployee, UpdateEmployee } from "../../../../types/employee";

export async function createEmployee(_: FormData, formData: FormData) {
    const session = await auth() as any;

    if (!session && !session.user) throw new Error("Unauthorized");

    const accessToken = session.user.access_token;

    if (!accessToken) throw new Error("Unauthorized");

    const current: CreateEmployee = {
        id_number: parseInt(formData.get("id_number") as unknown as string),
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        middlei: formData.get("middlei") as string,
        address: formData.get("address") as string,
        gender: formData.get("gender") as string,
        birthday: formData.get("birthday") as string,
        phone_number: formData.get("phone_number") as string,
        employment_status: formData.get("employment_status") as string,
        position: formData.get("position") as string,
        supervisor_id: parseInt(formData.get("supervisor_id") as unknown as string) as number,
        basic_salary: parseInt(formData.get("basic_salary") as unknown as string) as number,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(current)
    })

    console.log(JSON.stringify(res));

    if (!res.ok) throw new Error("An error occurred while creating an employee");

    const data = await res.json();

    revalidatePath("/admin/employee");

    return data;
}

export async function updateEmployee(_: FormData, formData: FormData) {
    const session = await auth() as any;

    if (!session && !session.user) throw new Error("Unauthorized");

    const accessToken = session.user.access_token;

    if (!accessToken) throw new Error("Unauthorized");

    const id = formData.get('id');

    const current: Omit<UpdateEmployee, "id"> = {
        id_number: parseInt(formData.get("id_number") as unknown as string),
        password: formData.get("password") as string,
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        middlei: formData.get("middlei") as string,
        address: formData.get("address") as string,
        gender: formData.get("gender") as string,
        birthday: formData.get("birthday") as string,
        phone_number: formData.get("phone_number") as string,
        employment_status: formData.get("employment_status") as string,
        position: formData.get("position") as string,
        supervisor_id: parseInt(formData.get("supervisor_id") as unknown as string) as number,
        basic_salary: parseInt(formData.get("basic_salary") as unknown as string) as number,
    }

    console.log(current);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(current)
    })

    console.error(res)

    if (!res.ok) throw new Error("An error occurred while updating an employee");

    const data = await res.json();

    revalidatePath("/admin/employee");

    return data;
}


export async function deleteEmployee(id: number) {
    const session = await auth() as any;

    if (!session && !session.user) throw new Error("Unauthorized");

    const accessToken = session.user.access_token;

    if (!accessToken) throw new Error("Unauthorized");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })

    console.log(res);

    if (!res.ok) throw new Error("An error occurred while deleting an employee");

    const data = await res.json();

    console.log(JSON.stringify(data));

    revalidatePath("/admin/employee");

    return data;
}
