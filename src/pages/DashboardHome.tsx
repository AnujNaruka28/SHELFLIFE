import StatusCard from "../components/cores/Dashboard/Home/StatusCard"

const CommonCard = ({ children, isTableBox }: { children: React.ReactNode, isTableBox: boolean }) => {
    return (
        <article className={`w-full h-[50%] ${isTableBox ? "min-[768px]:h-[86%]" : "min-[768px]:h-[14%]"} bg-card shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] p-4
        flex flex-col min-[768px]:flex-row gap-4`}>
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
        <div className="bg-muted w-full h-full overflow-x-hidden
        flex flex-col items-start px-4 py-2 gap-2">
            <h1 className="w-full text-muted-foreground font-semibold">
                Dashboard
            </h1>

            
            
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
                <div>
                    <h2>Recent Activity</h2>
                </div>
            </CommonCard>

        </div>

    )
}

export default DashboardHome;