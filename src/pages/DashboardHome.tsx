import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../lib/store"
const useAppDispatch = () => useDispatch<AppDispatch>()
import StatusCard from "../components/cores/Dashboard/Home/StatusCard"
import ItemTable from "../components/cores/Table/ItemTable"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { expiringItemsAction, statsAction } from "../lib/actions/dashboardAction"
import { Skeleton } from "@mui/material"

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
    "Expiring Soon": "--chart-2",
    "Expired": "--chart-3"
}

const DashboardHome = () => {

    const dispatch = useAppDispatch();
    
    const { 
        totalItems,
        fresh,
        expiring,
        expired,
        wasted,
        used,
        statsLoading,
        statsFetchError 
    } = useSelector((state: any) => state.dashboardStats);
    const {itemsExpiring, itemsLoading , itemsFetchError} = useSelector((state: any) => state.dashboardExpiringItems);

    const statusMapping = {
        fresh: "Fresh",
        expiring: "Expiring Soon",
        expired: "Expired",
        wasted: "Wasted",
        used: "Used"
    };

    const stats = {
        fresh,
        expiring,
        expired,
        wasted,
        used
    };

    const structuredStats = Object.entries(stats).map(([key, count], index) => ({
        id: index + 1,
        status: statusMapping[key as keyof typeof statusMapping],
        count: count as number
    }));

    useEffect(() => {
        dispatch(statsAction());
        dispatch(expiringItemsAction());
    }, [])

    return (     
        <>
            <CommonCard isTableBox={false}>
                
                {
                    statsLoading ? (
                        [1,2,3].map((item) => (
                            <motion.div 
                            key={item}
                            initial={{opacity: 0, y:20, scale: 0.95}}
                            animate={{opacity: 1, y:0, scale: 1}}
                            transition={{duration: 0.3}}
                            className="w-full h-1/3 min-[768px]:h-full min-[768px]:w-1/3 flex items-center justify-between px-4 bg-[#fff] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] rounded"
                            >
                                <Skeleton variant="text" width={100} height={30} />
                                <Skeleton variant="circular" width={40} height={40} />
                            </motion.div>
                        ))
                    ) : (

                        statsFetchError ? (<></>) : (
                        
                            structuredStats.map(stat => (
                                stat.status !== "Used" && stat.status !== "Wasted" &&
                                <StatusCard
                                    key={stat.id}
                                    status={stat.status}
                                    count={stat.count}
                                    colorClass={statusColor[stat.status as keyof typeof statusColor]}
                                />
                            ))

                        )

                    )
                }
                
            </CommonCard>

            <CommonCard isTableBox={true}>

                <div className='flex justify-between'>
                    {
                        ["Expires In 24 Hours",`Total Items: ${totalItems}`].map( 
                            (text,index) =>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-sm text-muted-foreground font-semibold"
                                    key={`${text} - ${index}`}>
                                        {text}
                                </motion.p>
                        )
                    }
                </div>

                <ItemTable data={itemsExpiring} itemsLoading={itemsLoading} itemsError={itemsFetchError} />
                
            </CommonCard>

        </>
    )
}

export default DashboardHome;