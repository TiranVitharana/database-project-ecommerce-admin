import { MdSupervisedUserCircle } from "react-icons/md";

const Card = () => {
    return (
        <div className="flex bg-backgroundSoft p-5 rounded-lg gap-5 w-full hover:bg-[#2e374a]">
            <MdSupervisedUserCircle size={24} />
            <div className="flex flex-col gap-5">
                <span className="font-semibold">Total Users</span>
                <span className="text-2xl font-medium">10.273</span>
                <span className="text-sm font-light">
          <span className="text-lime-500">12%</span> more than previous week
        </span>
            </div>
        </div>
    );
};

export default Card;
