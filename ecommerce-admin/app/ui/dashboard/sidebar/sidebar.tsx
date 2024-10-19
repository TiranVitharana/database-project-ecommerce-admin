import styles from "./sidebar.module.css"
import {MdDashboard, MdLogout} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard/>,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdDashboard/>,
            },
            {
                title: "Products",
                path: "/products",
                icon: <MdDashboard/>,
            },
            {
                title: "Transactions",
                path: "/transactions",
                icon: <MdDashboard/>,
            }
        ]
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: "/dashboard/revenue",
                icon: <MdDashboard/>,
            },
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdDashboard/>,
            },
            {
                title: "Teams",
                path: "/dashboard/teams",
                icon: <MdDashboard/>,
            },
        ]
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdDashboard/>,
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <MdDashboard/>,
            },
            {
                title: "Teams",
                path: "/dashboard/teams",
                icon: <MdDashboard/>,
            },
        ]
    },
]


const SideBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/user.png" alt="" width="50" height="50"></Image>
                <div className={styles.userDetail}>
                    <span className={styles.username}>Dasun Randeepa</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map((item)=>(
                            <MenuLink item={item} key={item.title}/>
                        ))}

                    </li>
                ))}
            </ul>
            <button className={styles.logout}>
                <MdLogout/>
                Logout
            </button>
        </div>
    );
}

export default SideBar;