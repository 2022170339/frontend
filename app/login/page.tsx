import { auth } from "../../auth";
import LoginForm from "../../components/forms/login-form";

export default async function Page() {
  return <main className="flex min-h-screen w-full">
    <LoginForm />
  </main>
}
