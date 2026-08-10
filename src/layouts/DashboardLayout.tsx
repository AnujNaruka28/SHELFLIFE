import NavButton from "../components/common/NavButton";
import { VscMenu } from "react-icons/vsc";
import { FaRegBell } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";
import SidebarDrawer from "../components/cores/Dashboard/Sidebar/SidebarDrawer";
import Sidebar from "../components/cores/Dashboard/Sidebar/Sidebar";
import { toggleSidebar } from "../lib/features/sideBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Notifications from "../components/common/Notifications";
import { useNotifications } from "../hooks/useNotifications";

const DashboardLayout = () => {
    const dispatch = useDispatch();
    const open = useSelector((state: any) => state.sidebar.open);
    const pathSegments = useLocation().pathname.split('/');
    const feature = pathSegments.length === 2 ? pathSegments[1] : pathSegments[pathSegments.length-1];
    const [notification,setNotification] = useState(false);
    const { notifyingItems } = useNotifications();

    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setNotification(false);
            }
        };

        if (notification) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [notification]);

    return (
        <main className="w-screen h-dvh flex">
            
            {
                open && (
                    <Sidebar />
                )
            }
            <section className={`w-full ${open ? 'min-[768px]:w-[80%]' : 'min-[768px]:w-[100%]'}  ${open ? 'min-[1024px]:w-[84%]' : 'min-[1024px]:w-[100%]'} flex flex-col`}>
                <nav className="w-full h-[60px] border-b border-border flex justify-between items-center px-4 relative">
                    
                    <NavButton onClick={() => dispatch(toggleSidebar())} >
                        <VscMenu size={18} className="text-muted-foreground" />
                    </NavButton>

                    <NavButton onClick={() => setNotification(prev => !prev)}
                    className="relative">
                        <FaRegBell size={18} className="text-muted-foreground" /> 
                        {
                            notifyingItems.length > 0 && 
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-0 right-0"/>
                        }
                    </NavButton>

                    {
                        notification && (
                            <motion.div 
                                ref={notificationRef}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="w-[280px] h-[360px] bg-[#fff] absolute right-12 top-8 z-10 px-4 py-2 flex flex-col items-center
                                shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]">

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full text-muted-foreground font-semibold mb-2"
                                    >
                                        Notification
                                    </motion.p> 

                                    <Notifications />

                            </motion.div>
                        )
                    }
                
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