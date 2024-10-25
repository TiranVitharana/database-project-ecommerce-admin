import SideBar from "@/app/ui/dashboard/sidebar/sidebar";
import NavBar from "@/app/ui/dashboard/navbar/navbar";
import styles from "../ui/dashboard/dashboard.module.css"
import {ReactNode} from "react";
import Footer from "@/app/ui/dashboard/footer/footer";

interface Props {
    children: ReactNode;
}
const Layout = ({children}: Props) => {
  return(
      <div className={styles.container}>
          <div className={styles.menu}>
              <SideBar/>
          </div>
          <div className={styles.content}>
              <NavBar/>
              {children}
              <Footer/>
          </div>
      </div>
  );
}

export default Layout;