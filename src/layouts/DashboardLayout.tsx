import NavButton from "../components/common/NavButton";
import { VscMenu } from "react-icons/vsc";
import { FaRegBell } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarDrawer from "../components/cores/Dashboard/Sidebar/SidebarDrawer";
import Sidebar from "../components/cores/Dashboard/Sidebar/Sidebar";



const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    
    return (
        <main className="w-screen h-dvh flex">

            <Sidebar />

            <article className="w-full min-[768px]:w-[80%] min-[1024px]:w-[84%] flex flex-col">
                <nav className="w-full h-[60px] border-b border-border flex justify-between items-center px-4">
                    
                    <NavButton onClick={() => setOpen(true)} >
                        <VscMenu size={18} className="text-muted-foreground" />
                    </NavButton>

                    <NavButton>
                        <FaRegBell size={18} className="text-muted-foreground" />
                    </NavButton>
                
                </nav>

                <section className="w-full h-[calc(100vh-60px)]">

                    <Outlet />
                    
                </section>
            </article>

            <SidebarDrawer open={open} onClose={() => setOpen(false)} />
            
        </main>
    )
}

export default DashboardLayout;