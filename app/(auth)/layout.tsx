import Sidebar from "@/components/shared/sidebar";
import { auth } from "@/auth";
import { Session } from "next-auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session: Session | null = await auth();

  if (!session) {
    return <div>Unauthorized</div>
  }

  return (
    <Sidebar>
      {children}
    </Sidebar>
  )
}
