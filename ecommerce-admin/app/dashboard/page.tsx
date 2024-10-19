import styles from "../ui/dashboard/dashboard.module.css"
import Chart from "../ui/dashboard/chart/chart";
import Transactions from "../ui/dashboard/transactions/transactions";
import Card from "../ui/dashboard/card/card";
import Rightbar from "@/app/ui/dashboard/rightbar/rightbar";

const DashBoard = () => {
  return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
            <div className={styles.cards}>
                <Card/>
                <Card/>
                <Card/>
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