"use client"
import styles from "./menuLink.module.css"
import Link from "next/link";
import {ReactNode} from "react";
import {usePathname} from "next/navigation";

interface Props {
    item : {
        path: string,
        title: string,
        icon: ReactNode
    };
}


const MenuLink = ({item}:Props) => {
    const pathname = usePathname();
  return(
      <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
          {item.icon}
          {item.title}
      </Link>
  );
}

export default MenuLink;