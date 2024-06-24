"use client"

import { useEffect } from "react";
import { Attendance, useAttendance } from "../../../../lib/stores";
import { differenceInMinutes } from "date-fns";

export const Control = ({
  id,
  accessToken,
  attendance: att,
}: {
  id: number;
  accessToken: string;
  attendance: Attendance[];
}) => {
  const {
    attendance,
    setAttendance,
    today,
    setToday,
    timeIn,
    timeOut
  } = useAttendance();


  useEffect(() => {
    setAttendance([
      ...attendance,
      ...att,
    ]);

    const today = att.find((a) => a.employee_id === id);
    if (today) {
      setToday(today);
    }
  }, [])

  const isTimedIn = today?.employee_id === id && today?.start_date;
  const isTimedOut = today?.employee_id === id && isTimedIn && today?.end_date;

  return (
    <div className="flex flex-col dark:bg-zinc-800 shadow-md rounded-lg w-[60%] p-8 justify-center items-center m-auto">
      {
        !isTimedIn && !isTimedOut && (
          <p className="text-lg text-center text-white p-2 rounded-lg">
            You are not clocked in
          </p>
        )
      }
      {
        isTimedIn && !isTimedOut && (
          <p className="text-lg text-center text-white p-2 rounded-lg">
            You are clocked in. Current time: {differenceInMinutes(new Date(today?.start_date), new Date())} hours
          </p>
        )
      }
      {
        isTimedIn && isTimedOut && (
          <p className="text-lg text-center text-white p-2 rounded-lg">
            You are clocked out. Total time: {today?.total_hours.toFixed(2)} hours
          </p>
        )
      }
      <div className="flex gap-2 mt-4">
        <button className={[
          "btn btn-success",
          isTimedIn ? "btn-disabled cursor-not-allowed" : ""
        ].join(" ")}
          onClick={async () => {
            await timeIn(id, accessToken);
          }}>
          Time In
        </button>

        <button className={[
          "btn btn-warning",
          isTimedOut ? "btn-disabled cursor-not-allowed" : ""
        ].join(" ")} onClick={async () => {
          await timeOut(id, accessToken);
          window.location.reload();
        }}>
          Time Out
        </button>
      </div>
    </div>
  )
}

export default Control;
