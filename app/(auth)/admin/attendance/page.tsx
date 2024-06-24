import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { format } from "date-fns";
import Control from "./control";
import { Attendance } from "../../../../lib/stores";

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

  const profile = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}employee/current`, payload);

  const { id } = await profile.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}attendance/${id}`, payload);

  let attendances: Attendance[];

  if (!res.ok) {
    const response = await res.json();
    if (response.detail === "Attendance not found") {
      attendances = [];
    } else {
      return (
        <main>
          <h1>Something went wrong</h1>
          <pre>{JSON.stringify(await res.json())}</pre>
        </main>
      )
    }
  } else {
    attendances = await res.json() as Attendance[];
  }

  return <main className="flex flex-col min-h-screen w-full gap-4">
    <Control id={id} accessToken={accessToken} attendance={attendances} />
    <div className="overflow-x-auto w-full">
      <h1 className="font-bold">Attendance</h1>
      <table className="table table-xs w-full table-zebra-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Time (Hours)</th>
            <th>Start</th>
            <th>End</th>
            <th>Notes</th>
            <th>Overtime</th>
          </tr>
        </thead>
        <tbody>
          {
            attendances.map(attendance => (
              <tr key={attendance.id}>
                <th>{attendance.employee_id}</th>
                <th>{attendance.total_hours.toFixed(2)}</th>
                <th>{format(new Date(attendance.start_date), "MMMM dd, yyyy hh:mm a")}</th>
                <th>{format(new Date(attendance.end_date), "MMMM dd, yyyy hh:mm a")}</th>
                <th>{attendance.notes ?? "NO NOTES"}</th>
                <th>{attendance.overtime === 0 ? "NO OVERTIME" :
                  attendance.overtime}</th>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Time (Hours)</th>
            <th>Start</th>
            <th>End</th>
            <th>Notes</th>
            <th>Overtime</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </main>
}
