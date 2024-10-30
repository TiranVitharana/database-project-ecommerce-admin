import SideBar from "@/app/ui/dashboard/sidebar/sidebar";
import NavBar from "@/app/ui/dashboard/navbar/navbar";
import Footer from "@/app/ui/dashboard/footer/footer";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <div className="w-1/5 bg-backgroundSoft p-5">
                    <SideBar />
                </div>
                <div className="flex-1 p-5">
                    <NavBar />
                    <div className="mt-5 flex-1 overflow-auto">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Layout;
