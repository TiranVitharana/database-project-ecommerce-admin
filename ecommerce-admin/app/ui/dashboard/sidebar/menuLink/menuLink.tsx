"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface Props {
    item: {
        path: string;
        title: string;
        icon: ReactNode;
    };
}

const MenuLink = ({ item }: Props) => {
    const pathname = usePathname();
    const isActive = pathname === item.path;

    return (
        <Link
            href={item.path}
            className={`flex items-center gap-2 p-5 rounded-lg transition-colors duration-200 
                        ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
            {item.icon}
            {item.title}
        </Link>
    );
};

export default MenuLink;
