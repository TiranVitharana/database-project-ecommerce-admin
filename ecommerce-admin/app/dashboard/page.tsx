import Chart from "../ui/dashboard/chart/chart";
import Transactions from "../ui/dashboard/transactions/transactions";
import Card from "../ui/dashboard/card/card";
import Card1 from "@/app/ui/dashboard/card1/card1";
import Card2 from "@/app/ui/dashboard/card2/card2";
import Card3 from "@/app/ui/dashboard/card3/card3";
import PWMO_Table from "@/app/ui/dashboard/pwmo_table/chart";
import ProductTrend from "@/app/ui/dashboard/producttrend_chart/chart";
import CustomerOrders from "@/app/ui/dashboard/orderreport/page";
import Card4 from "@/app/ui/dashboard/card4/card4";
import OrdersPieChart from "@/app/ui/dashboard/piechart/chart";

const DashBoard = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-5 justify-between">
                <Card1/>
                <Card2/>
                <Card3/>
                <Card4/>
            </div>
            <div className="flex flex-col-2 gap-5 justify-between">
                <div className="w-[50%]"><Chart/></div>
                <div className="w-[50%]"><OrdersPieChart/></div>
            </div>

            <div className="flex flex-col-2 gap-5 justify-between">
                <div className="w-[50%]"><PWMO_Table/></div>
                <div className="w-[50%]"><ProductTrend/></div>
            </div>
            <div className="flex flex-col-2 gap-5 justify-between">

                <div className="w-[100%]"><Transactions/></div>

            </div>
        </div>
    );
}

export default DashBoard;
