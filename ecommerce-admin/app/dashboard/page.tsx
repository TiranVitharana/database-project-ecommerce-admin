import Chart from "../ui/dashboard/chart/chart";
import Transactions from "../ui/dashboard/transactions/transactions";
import Card from "../ui/dashboard/card/card";
import Card1 from "@/app/ui/dashboard/card1/card1";
import Card2 from "@/app/ui/dashboard/card2/card2";
import Card3 from "@/app/ui/dashboard/card3/card3";
import PWMO_Chart from "@/app/ui/dashboard/pwmo_chart/chart";
import ProductTrend from "@/app/ui/dashboard/producttrend_chart/chart";
import CustomerOrders from "@/app/ui/dashboard/orderreport/page";

const DashBoard = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-5 justify-between">
                <Card1/>
                <Card2/>
                <Card3/>
            </div>
            <Chart/>
            <PWMO_Chart/>
            <Transactions/>
            <ProductTrend/>

            <CustomerOrders/>
        </div>
    );
}

export default DashBoard;
