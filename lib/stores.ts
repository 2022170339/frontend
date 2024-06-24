import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Attendance = {
  employee_id: number;
  id: number;
  total_hours: number;
  start_date: string;
  end_date: string;
  notes: string;
  overtime: number;
};

export type AttendanceState = {
  attendance: Attendance[];
  setAttendance: (attendance: Attendance[]) => void;
  today: Attendance | null;
  setToday: (today: Attendance | null) => void;
  getToday: (id: number) => void;
  timeIn: (id: number, accessToken: string) => void;
  timeOut: (id: number, accessToken: string) => void;
};

export const useAttendance = create<AttendanceState>()(
  persist(
    (set, get) => ({
      attendance: [],
      setAttendance: (attendance) => set({ attendance }),
      today: null,
      setToday: (today) => set({ today }),
      getToday: (id) => {
        const today = get().attendance.find((a) => a.employee_id === id);
        if (today) {
          set({ today });
        } else {
          set({ today: null });
        }
      },
      timeIn: async (id, accessToken) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}attendance/timein`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        });

        if (!res.ok) {
          const { detail } = await res.json();
          if (detail === "You have already timed in") {
            set({ today: { employee_id: id, start_date: new Date().toISOString(), end_date: "" } as Attendance });
          }
        }

        if (res.ok) {
          const attendance = get().attendance.map((a) => {
            if (a.employee_id === id) {
              return {
                ...a,
                start_date: new Date().toISOString()
              };
            }

            return a;
          });
          set({
            attendance,
            today: { employee_id: id, start_date: new Date().toISOString(), end_date: "" } as Attendance
          })
        }
      },
      timeOut: async (id, accessToken) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}attendance/timeout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        });

        if (!res.ok) {
          const { detail } = await res.json();
          if (detail === "You have already timed out") {
            set({ today: { employee_id: id, start_date: new Date().toISOString(), end_date: "" } as Attendance });
          }
        }

        if (res.ok) {
          const attendance = get().attendance.map((a) => {
            if (a.employee_id === id) {
              return {
                ...a,
                end_date: new Date().toISOString()
              };
            }

            return a;
          });
          set({
            attendance,
            today: { employee_id: id, start_date: new Date().toISOString(), end_date: "" } as Attendance
          })
        }
      }
    }),
    {
      name: 'attendance',
      storage: createJSONStorage(() => localStorage),
    }
  )
)


//export const useAttendance = create<AttendanceState>((set, get) => ({
//  attendance: [],
//  setAttendance: (attendance) => set({ attendance }),
//  today: null,
//  setToday: (today) => set({ today }),
//  getToday: (id) => {
//    const today = useAttendance.getState().attendance.find((a) => a.employee_id === id);
//    if (today) {
//      useAttendance.setState({ today });
//    } else {
//      useAttendance.setState({ today: null });
//    }
//  },
//  timeIn: async (id, accessToken) => {
//    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}attendance/timein`, {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//        "Authorization": `Bearer ${accessToken}`
//      },
//    });
//
//    if (!res.ok) {
//      const { detail } = await res.json();
//      if (detail === "You have already timed in") {
//        useAttendance.setState({ today: { employee_id: id, start_date: new Date().toISOString(), end_date: "" } as Attendance });
//      }
//    }
//
//    if (res.ok) {
//      const attendance = useAttendance.getState().attendance.map((a) => {
//        if (a.employee_id === id) {
//          return {
//            ...a,
//            start_date: new Date().toISOString()
//          };
//        }
//
//        return a;
//      });
//      set({
//        ...get(),
//        attendance,
//        today: { employee_id: id, start_date: new Date().toISOString(), end_date: "" } as Attendance
//      })
//    }
//  },
//  timeOut: async (id, accessToken) => {
//    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}attendance/timeout`, {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//        "Authorization": `Bearer ${accessToken}`
//      },
//    });
//
//    if (!res.ok) {
//      const { detail } = await res.json();
//      if (detail === "You have already timed out") {
//        useAttendance.setState({ today: { employee_id: id, start_date: new Date().toISOString(), end_date: "" } as Attendance });
//      }
//    }
//
//    if (res.ok) {
//      const attendance = useAttendance.getState().attendance.map((a) => {
//        if (a.employee_id === id) {
//          return {
//            ...a,
//            end_date: new Date().toISOString()
//          };
//        }
//
//        return a;
//      });
//      set({
//        ...get(),
//        attendance,
//        today: { employee_id: id, start_date: new Date().toISOString(), end_date: "" } as Attendance
//      })
//    }
//  }
//}));
