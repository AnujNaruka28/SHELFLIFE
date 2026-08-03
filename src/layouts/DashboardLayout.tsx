import NavButton from "../components/common/NavButton";
import { VscMenu } from "react-icons/vsc";
import { FaRegBell } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";
import SidebarDrawer from "../components/cores/Dashboard/Sidebar/SidebarDrawer";
import Sidebar from "../components/cores/Dashboard/Sidebar/Sidebar";
import { toggleSidebar } from "../lib/features/sideBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const DashboardLayout = () => {
    const dispatch = useDispatch();
    const open = useSelector((state: any) => state.sidebar.open);
    const pathSegments = useLocation().pathname.split('/');
    const feature = pathSegments.length === 2 ? pathSegments[1] : pathSegments[pathSegments.length-1];
    return (
        <main className="w-screen h-dvh flex">
            
            {
                open && (
                    <Sidebar />
                )
            }
            <section className={`w-full ${open ? 'min-[768px]:w-[80%]' : 'min-[768px]:w-[100%]'}  ${open ? 'min-[1024px]:w-[84%]' : 'min-[1024px]:w-[100%]'} flex flex-col`}>
                <nav className="w-full h-[60px] border-b border-border flex justify-between items-center px-4">
                    
                    <NavButton onClick={() => dispatch(toggleSidebar())} >
                        <VscMenu size={18} className="text-muted-foreground" />
                    </NavButton>

                    <NavButton>
                        <FaRegBell size={18} className="text-muted-foreground" />
                    </NavButton>
                
                </nav>

                <div className="w-full h-[calc(100vh-60px)]">
                    <div className="bg-muted w-full h-full overflow-x-hidden
                    flex flex-col items-start px-4 py-2 gap-2">
                        <motion.h1 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full text-muted-foreground font-semibold"
                        >
                            {feature.charAt(0).toUpperCase() + feature.slice(1)}
                        </motion.h1>
                        <Outlet />
                    </div>
                </div>
            </section>

            <SidebarDrawer open={open} onClose={() => dispatch(toggleSidebar())} />
            
        </main>
    )
}

export default DashboardLayout;