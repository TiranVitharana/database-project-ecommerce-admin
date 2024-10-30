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
                title: "Customers",
                path: "/dashboard/users",
                icon: <MdDashboard/>,
            },
            {
                title: "Products",
                path: "/dashboard/products",
                icon: <MdDashboard/>,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <MdDashboard/>,
            }
        ]
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Customer Order Reports",
                path: "/dashboard/reports",
                icon: <MdDashboard/>,
            },
            {
                title: "Quarterly Sales Reports",
                path: "/dashboard/quarterlysalesreport",
                icon: <MdDashboard/>,
            },
            {
                title: "Product Trends",
                path: "/dashboard/producttrends",
                icon: <MdDashboard/>,
            },
            {
                title: "Orders",
                path: "/dashboard/orders",
                icon: <MdDashboard/>,
            }
        ]
    },
    {
        title: "User",
        list: [
            
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