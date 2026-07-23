import { motion } from "framer-motion"

interface StatusCardProps {
    status: string;
    count: number;
    colorClass: string;
}

const StatusCard = ({ status, count, colorClass }: StatusCardProps) => {
    return (
        <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full h-1/3 min-[768px]:h-full min-[768px]:w-1/3 flex items-center justify-between px-4 bg-[#fff] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] rounded">
            <p className="font-semibold" style={{ color: `var(${colorClass})` }}>
                {status}
            </p>
            <div 
                className="rounded-full px-3 py-1 text-white font-bold"
                style={{
                    backgroundColor: `var(${colorClass})`,
                }}
            >
                {count}
            </div>
        </motion.div>
    )
}

export default StatusCard;