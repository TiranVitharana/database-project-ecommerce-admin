"use client"
import { MdDashboard, MdLogout, MdInventory, MdLocalShipping, MdPeople, MdSettings, MdBarChart, MdHelpCenter } from "react-icons/md";
import Image from "next/image";
import LogoutButton from "@/app/ui/dashboard/logout/LogoutButton";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import MenuLink from "@/app/ui/dashboard/sidebar/menuLink/menuLink";

interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}

interface MenuCategory {
    title: string;
    list: MenuItem[];
}

type UserRole = 'Admin' | 'Inventory Manager' | 'Delivery Person';

const menuConfig: { [key in UserRole]: MenuCategory[] } = {
    Admin: [
        {
            title: "Pages",
            list: [
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    icon: <MdDashboard />,
                },
                {
                    title: "Users",
                    path: "/dashboard/users",
                    icon: <MdPeople />,
                },
                {
                    title: "Products",
                    path: "/dashboard/inventory/products",
                    icon: <MdInventory />,
                },
                {
                    title: "Orders",
                    path: "/dashboard/orders",
                    icon: <MdBarChart />,
                },
            ],
        },
        {
            title: "Analytics",
            list: [
                {
                    title: "Customer-Order",
                    path: "/dashboard/analytics/customer-order",
                    icon: <MdBarChart />,
                },
                // {
                //     title: "Reports",
                //     path: "/dashboard/analytics",
                //     icon: <MdBarChart />,
                // },
            ],
        },
        // {
        //     title: "User",
        //     list: [
        //         {
        //             title: "Settings",
        //             path: "/dashboard/settings",
        //             icon: <MdSettings />,
        //         },
        //         {
        //             title: "Help",
        //             path: "/dashboard/help",
        //             icon: <MdHelpCenter />,
        //         },
        //     ],
        // },
    ],
    "Inventory Manager": [
        {
            title: "Inventory",
            list: [
                {
                    title: "Products",
                    path: "/dashboard/inventory",
                    icon: <MdInventory />,
                },
                {
                    title: "Products",
                    path: "/dashboard/inventory/products",
                    icon: <MdInventory />,
                },
                {
                    title: "Stock Management",
                    path: "/dashboard/inventory/stock",
                    icon: <MdInventory />,
                },
            ],
        },
        {
            title: "User",
            list: [
                {
                    title: "Settings",
                    path: "/dashboard/settings",
                    icon: <MdSettings />,
                },
                {
                    title: "Help",
                    path: "/dashboard/help",
                    icon: <MdHelpCenter />,
                },
            ],
        },
    ],
    "Delivery Person": [
        {
            title: "Delivery",
            list: [
                {
                    title: "Deliveries",
                    path: "/dashboard/delivery",
                    icon: <MdLocalShipping />,
                },
            ],
        },
        {
            title: "User",
            list: [
                {
                    title: "Settings",
                    path: "/dashboard/settings",
                    icon: <MdSettings />,
                },
                {
                    title: "Help",
                    path: "/dashboard/help",
                    icon: <MdHelpCenter />,
                },
            ],
        },
    ],
};

const RoleSidebar = () => {
    const { data: session } = useSession();
    const userRole = (session?.user?.role || 'admin') as UserRole;

    const roleMenuItems = menuConfig[userRole] || [];

    return (
        <div className="sticky top-10 p-5 text-white h-full">
            <div className="flex items-center gap-5 mb-5">
                <Image className="rounded-full object-cover" src="/user.png" alt="" width={50} height={50} />
                <div className="flex flex-col">
                    <span className="font-medium">{session?.user?.name}</span>
                    <span className="text-sm text-gray-400">{userRole}</span>
                </div>
            </div>
            <ul className="list-none">
                {roleMenuItems.map((cat) => (
                    <li key={cat.title} className="mb-4">
                        <span className="text-gray-400 font-bold text-sm mb-2 block">{cat.title}</span>
                        {cat.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <LogoutButton />
        </div>
    );
};

export default RoleSidebar;