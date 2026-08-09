import LogoHeader from "../../../common/LogoHeader";
import SideNavOptions from "./SideNavOptions";
import { useSelector } from "react-redux";

const Sidebar = () => {

    const {householdName} = useSelector((state: any) => state.auth);
    
    return (         
        <aside className="hidden min-[768px]:block min-[768px]:w-[24%] min-[1024px]:w-[20%] h-full border-r border-border bg-sidebar">

                <div className="px-4 h-full flex flex-col">
                    <header className="h-[60px] flex items-center mb-2">
                        <LogoHeader isSidebarLogo={true} className="h-[100%_!important]" />
                    </header>
                    <SideNavOptions />

                    <div 
                        className="font-medium text-sm px-4 py-2 rounded-lg w-fit mt-auto mb-4
                        shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] bg-[#fff]"
                    >
                        <p className="ml-1">{householdName}</p>
                    </div>
                </div>

        </aside>
    );
}

export default Sidebar;
