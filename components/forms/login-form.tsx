"use client"

import { SignIn } from "@/app/login/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const loginSchema = z.object({
        id: z.string({
            required_error: "Id is required!",
        }).min(1, { message: "Id is required!" }),
        password: z.string({
            required_error: "Password is required!",
        }).min(1, { message: "Password is too short!" })
    })

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<{
        id: string;
        password: string;
    }>({
        defaultValues: {
            id: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        const { id, password } = data

        try {
            const res = await SignIn({
                id,
                password,
            });

            setIsLoading(false);
            router.push(window.location.origin + "/admin/profile");
        } catch (e) {
            console.error(e)
            return;
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen ">
            <form className="p-4 rounded-lg bg-white shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                        Employee ID
                    </label>
                    <input {...register('id')} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline text-center" placeholder="Employee ID" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input {...register('password')} type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline text-center" placeholder="Password" required />
                </div>
                {errors && (
                    <>
                        {
                            Object.entries(errors).map(([key, value]) => (
                                <p key={key} className="text-red-500 text-xs italic">{value.message}</p>
                            ))
                        }
                    </>
                )}
                <div className="flex items-center justify-center">
                    <button disabled={isLoading} className="flex flex-row gap-2 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {isLoading && <FaSpinner className="animate-spin" />}
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
