"use client"
import styles from "./navbar.module.css"
import {usePathname} from "next/navigation";
import {MdChat, MdNotifications, MdOutlineChat, MdPublic, MdSearch} from "react-icons/md";

const NavBar = () => {
    const pathname = usePathname();
    return (
      <div className={styles.container}>
          <div className={styles.title}>{pathname.split('/').pop()}</div>
          <div className={styles.menu}>
              <div className={styles.search}>
                  <MdSearch/>
                  <input type="text" placeholder="Search" className={styles.input}></input>
              </div>
              <div>
                  <MdOutlineChat size={20}/>
                  <MdNotifications size={20}/>
                  <MdPublic size={20}/>
              </div>
          </div>
      </div>
    );
}

export default NavBar;