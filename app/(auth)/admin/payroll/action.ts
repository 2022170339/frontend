"use server"

import { revalidatePath } from "next/cache";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

type GeneratePayslip = {
    start_date: string;
    end_date: string;
}

export async function generateEmployeePayslip(_: FormData, formData: FormData) {
    const session = await auth() as any;

    if (!session && !session.user) throw new Error("Unauthorized");

    const accessToken = session.user.access_token;

    if (!accessToken) throw new Error("Unauthorized");

    const { id, start_date, end_date } = Object.fromEntries(formData.entries());

    const payload: GeneratePayslip = {
        start_date: start_date as string,
        end_date: end_date as string,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}payroll/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
    })

    if (!res.ok) return await res.json();

    const data = await res.json();

    revalidatePath("/admin/payroll");
    redirect(`/admin/payroll/${data?.id}`)

    return data;
}
