import { motion } from "motion/react";
import { Link } from "react-router-dom";
import ShelfLifeLogo from "../../assets/shelf-life-main.svg";

interface LogoHeaderProps {
  isSidebarLogo?: boolean;
  className?: string;
}

const LogoHeader = ({ isSidebarLogo = false, className = "" }: LogoHeaderProps) => {
  return (
    <Link to="/">
      <motion.div 
        animate={{ y: 0 }}
        initial={{ y: -100 }}
        className={`w-full h-[80px] flex ${className} ${isSidebarLogo ? 'flex-row' : 'flex-col justify-center'} items-center gap-2 mt-2`}
      >
        <img 
          src={ShelfLifeLogo} 
          alt="ShelfLife Logo" 
          width={48}
          height={48} 
          loading="eager"
          className={`px-1 py-0.5 ${isSidebarLogo ? 'ml-2' : 'border-border border rounded-lg bg-muted'}`}
        />
        <motion.h1
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          className="font-bold text-foreground tracking-wider leading-tight"
        > 
          ShelfLife
        </motion.h1>
      </motion.div>
    </Link>
  );
};

export default LogoHeader;
