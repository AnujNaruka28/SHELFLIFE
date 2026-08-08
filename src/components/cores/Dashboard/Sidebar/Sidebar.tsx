import LogoHeader from "../../../common/LogoHeader";
import SideNavOptions from "./SideNavOptions";

const Sidebar = () => {
    return (         
        <aside className="hidden min-[768px]:block min-[768px]:w-[24%] min-[1024px]:w-[20%] h-full border-r border-border bg-sidebar">

                <div className="px-4 h-full flex flex-col">
                    <header className="h-[60px] flex items-center mb-2">
                        <LogoHeader isSidebarLogo={true} className="h-[100%_!important]" />
                    </header>
                    <SideNavOptions />
                </div>

        </aside>
    );
}

export default Sidebar;
