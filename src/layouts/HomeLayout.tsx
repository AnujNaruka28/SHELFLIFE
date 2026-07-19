import { motion } from "motion/react";
import ShelfLifeLogo from "../assets/shelf-life-main.svg";
import { Link, Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <section className="w-screen h-screen overflow-hidden">

            <Link to="/">
                <motion.div 
                    animate={{ y: 0 }}
                    initial={{ y: -100 }}
                    className="w-full h-[80px] flex flex-col items-center justify-center gap-2 mt-2">
                        <img 
                            src={ShelfLifeLogo} 
                            alt="ShelfLife Logo" 
                            width={48}
                            height={48} 
                            loading="eager"
                            className="border-border border rounded-lg px-1 py-0.5 bg-muted"
                        />
                        <motion.h1
                            animate={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -100 }}
                            className="font-bold text-foreground tracking-wider leading-tight"> 
                            ShelfLife
                        </motion.h1>
                </motion.div>
            </Link>

            <div className="w-full h-[calc(100vh-80px)] px-12 py-6 
            flex flex-col justify-center item-center ">
                <Outlet/>
            </div>

        </section>
    )
}

export default HomeLayout;