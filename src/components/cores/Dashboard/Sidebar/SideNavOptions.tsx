import { Link, useLocation } from "react-router-dom";
import { isActiveRoute } from "../../../../utils/isActiveRoute";
import { sidebarOptions } from "../../../../utils/sidebarOptions";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { MdOutlineInventory2, MdOutlineLeaderboard } from "react-icons/md";

const icons = {
    dashboard: <RiDashboardHorizontalLine size={18} />,
    settings: <IoSettingsOutline size={18} />,
    members: <BsPeople size={18} />,
    inventory: <MdOutlineInventory2 size={18} />,
    leaderboard: <MdOutlineLeaderboard size={18} />,
}

const SideNavOptions = () => {
    const location = useLocation();
    return (
        <ul className="flex flex-col gap-2">
            {sidebarOptions.map((item) => {
                let active = isActiveRoute(item.path, location.pathname);
                return (
                    <li key={item.label}>
                        <Link to={item.path} className={`text-left px-3 py-2 rounded flex items-center gap-2
                        ${active ? 'ring-sidebar-ring data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground' : 'text-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                            {icons[item.icon]}
                            {item.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default SideNavOptions;