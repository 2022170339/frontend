import { signOut } from "@/auth"
import { redirect } from "next/navigation";

export default function SignOutPage() {
  return (
    <div>
      <h5>Are you sure you want to sign out?</h5>
      <form
        action={async (formData) => {
          "use server"
          await signOut();
          return redirect("/login");
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}
