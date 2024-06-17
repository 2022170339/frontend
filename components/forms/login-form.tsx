import { signIn } from "@/auth";

export default function LoginForm() {
    return (
        <div className="flex items-center justify-center h-screen w-screen ">
            <form className="p-4 rounded-lg bg-white shadow-md" action={async (formData) => {
                "use server"
                await signIn("credentials", {
                    id: formData.get("id"),
                    password: formData.get("password"),
                    redirectTo: "/admin",
                });
            }}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                        Employee ID
                    </label>
                    <input name="id" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline text-center" placeholder="Employee ID" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input name="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline text-center" placeholder="Password" required />
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
