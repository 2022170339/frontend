import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import EmployeeList from "./employee-list";

export default async function Page() {
    const session = await auth() as any;

    if (!session && !session?.user) redirect("/login");

    const accessToken = session.user.access_token;

    if (!accessToken) redirect("/login");

    const payload = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee`, payload);

    if (!res.ok) return (
        <main>
            <h1>Something went wrong</h1>
            <pre>{JSON.stringify(await res.json())}</pre>
        </main>
    )

    const employee = await res.json();

    console.log(employee);

    return <main className="flex flex-col min-h-screen w-full gap-4">
        <EmployeeList employees={employee} />
    </main>
}
