'use client'

import styles from "../ui/dashboard/dashboard.module.css"
import Chart from "../ui/dashboard/chart/chart";
import Transactions from "../ui/dashboard/transactions/transactions";
import Card1 from "../ui/dashboard/card1/card1";
import Card2 from "../ui/dashboard/card2/card2";
import Card3 from "../ui/dashboard/card3/card3";

import PWMO_Table from "../ui/dashboard/pwmo_table/chart";
import ProductTrend from "../ui/dashboard/producttrend_chart/chart";
import CustomerOrders from "../ui/dashboard/orderreport/page";
import "../ui/globals.css";
import OrdersPage from "../ui/dashboard/orders/order";
import OrdersPieChart from "../ui/dashboard/piechart/chart";


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
            <PWMO_Table/>
            <Transactions/>
            <ProductTrend/>

            <CustomerOrders/>
            <OrdersPage/>
            <OrdersPieChart/>
        </div>
        <div className={styles.side}>
            <div className={styles.side}>
             
            </div>
        </div>
      </div>
  );
}

export default DashBoard;