import Link from "next/link";
import { adminMenus } from "../../config";

export default function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div className="drawer lg:drawer-open" suppressHydrationWarning>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center w-full h-full p-2">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {adminMenus.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href}>
                                <div className="flex items-center">
                                    <div className="icon">
                                        <i className="fas fa-home"></i>
                                    </div>
                                    <span className="ml-2">{item.title}</span>
                                </div>
                            </Link>
                        </li>

                    ))}
                </ul>

            </div>
        </div>
    )
}
