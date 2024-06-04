import Sidebar from "@/components/shared/sidebar";
import { auth } from "@/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    return <div>Unauthorized</div>
  }

  return (
    <Sidebar>
      {children}
    </Sidebar>
  )
}
