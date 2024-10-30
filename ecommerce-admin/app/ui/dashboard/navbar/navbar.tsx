"use client";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const pathname = usePathname();
    return (
        <div className="flex items-center justify-between p-5 rounded-lg bg-backgroundSoft">
            <div className="text-textSoft font-bold capitalize">{pathname.split('/').pop()}</div>
            {/*<div className="flex items-center gap-5">*/}
            {/*    <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg">*/}
            {/*        <MdSearch />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            placeholder="Search"*/}
            {/*            className="bg-transparent border-none text-text outline-none"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="flex gap-5 icons">*/}
            {/*        <MdOutlineChat size={20} />*/}
            {/*        <MdNotifications size={20} />*/}
            {/*        <MdPublic size={20} />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default NavBar;
