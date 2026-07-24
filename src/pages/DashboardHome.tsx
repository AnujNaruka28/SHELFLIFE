import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../lib/store"
const useAppDispatch = () => useDispatch<AppDispatch>()
import StatusCard from "../components/cores/Dashboard/Home/StatusCard"
import ItemTable from "../components/cores/Table/ItemTable"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { statsAction } from "../lib/actions/dashboardAction"

const CommonCard = ({ children, isTableBox }: { children: React.ReactNode, isTableBox: boolean }) => {
    return (
        <article className={`w-full h-[50%] ${isTableBox ? "min-[768px]:h-[86%]" : "min-[768px]:h-[14%] min-[768px]:flex-row"} bg-card shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] p-4
        flex flex-col gap-4`}>
            {children}
        </article>
    )
}

const statusColor = {
    "Fresh": "--chart-1",
    "Expired": "--chart-2",
    "Expiring Soon": "--chart-3"
}

const DashboardHome = () => {

    const dispatch = useAppDispatch();
    
    const { totalItems, stats, statsLoading, statsFetchError } = useSelector((state: any) => state.dashboardStats);
    const {itemsExpiring, itemsLoading , itemsFetchError} = useSelector((state: any) => state.dashboardExpiringItems);

    const statusMapping = {
        fresh: "Fresh",
        expiring: "Expiring Soon",
        expired: "Expired",
        wasted: "Wasted",
        used: "Used"
    };

    const structuredStats = Object.entries(stats).map(([key, count], index) => ({
        id: index + 1,
        status: statusMapping[key as keyof typeof statusMapping],
        count: count as number
    }));

    useEffect(() => {
        dispatch(statsAction());
    }, [])

    return (     
        <>
            <CommonCard isTableBox={false}>
                
                {
                    structuredStats.map(stat => (
                        stat.status !== "Used" && stat.status !== "Wasted" &&
                        <StatusCard
                            key={stat.id}
                            status={stat.status}
                            count={stat.count}
                            colorClass={statusColor[stat.status as keyof typeof statusColor]}
                        />
                    ))
                }
                
            </CommonCard>

            <CommonCard isTableBox={true}>
                <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-muted-foreground font-semibold">Expires In 24 Hours</motion.p>
                <ItemTable data={itemsExpiring} itemsLoading={itemsLoading} itemsError={itemsFetchError} />
            </CommonCard>

        </>
    )
}

export default DashboardHome;