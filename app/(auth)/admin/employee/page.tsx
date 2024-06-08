import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import EmployeeList from "./employee-list";

export default async function Page() {
    const session = await auth() as any;

    if (!session && !session?.user) redirect("/login");

    const accessToken = session.user.access_token;

    if (!accessToken) redirect("/login");

    const res = await fetch(`${process.env.BASE_URL!}employee`, {
        headers: {
            method: "GET",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) return null;

    const employee = await res.json();

    return <main className="flex flex-col min-h-screen w-full gap-4">
        <EmployeeList employees={employee} />
    </main>
}
