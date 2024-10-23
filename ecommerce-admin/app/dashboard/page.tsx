import styles from "../ui/dashboard/dashboard.module.css"
import Chart from "../ui/dashboard/chart/chart";
import Transactions from "../ui/dashboard/transactions/transactions";
import Card1 from "../ui/dashboard/card1/card1";
import Card2 from "../ui/dashboard/card2/card2";
import Card3 from "../ui/dashboard/card3/card3";
import "../ui/globals.css";
import Rightbar from "@/app/ui/dashboard/rightbar/rightbar";

const DashBoard = () => {
  return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
            <div className={styles.cards}>
                <Card1/>
                <Card2/>
                <Card3/>
            </div>
            <Chart/>
            <Transactions/>
        </div>
        <div className={styles.side}>
            <div className={styles.side}>
                <Rightbar/>
            </div>
        </div>
      </div>
  );
}

export default DashBoard;