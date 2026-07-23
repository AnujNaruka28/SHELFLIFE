import StatusCard from "../components/cores/Dashboard/Home/StatusCard"
import ItemTable from "../components/cores/Table/ItemTable"

const CommonCard = ({ children, isTableBox }: { children: React.ReactNode, isTableBox: boolean }) => {
    return (
        <article className={`w-full h-[50%] ${isTableBox ? "min-[768px]:h-[86%]" : "min-[768px]:h-[14%] min-[768px]:flex-row"} bg-card shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] p-4
        flex flex-col gap-4`}>
            {children}
        </article>
    )
}

const stats = [
    {
        id: 1,
        status: "Fresh",
        count: 10
    },
    {
        id: 2,
        status: "Expired",
        count: 5
    },
    {
        id: 3,
        status: "Expiring Soon",
        count: 3
    }
]

const statusColor = {
    "Fresh": "--chart-1",
    "Expired": "--chart-2",
    "Expiring Soon": "--chart-3"
}

const DashboardHome = () => {
    return (     
        <>
            <CommonCard isTableBox={false}>
                {
                    stats.map(stat => (
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
                <p className="text-sm text-muted-foreground font-semibold">Expires In 24 Hours</p>
                <ItemTable data={[]} />
            </CommonCard>

        </>
    )
}

export default DashboardHome;