"use server"

import { auth } from "../../../../auth";
import { CreateEmployee } from "../../../../types/employee";

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
        supervisor_id: formData.get("supervisor_id") as string,
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

    console.log(JSON.stringify(data));

    return data;
}
