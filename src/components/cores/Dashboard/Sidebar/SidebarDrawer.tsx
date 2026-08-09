import { Drawer } from "@mui/material";
import LogoHeader from "../../../common/LogoHeader";
import SideNavOptions from "./SideNavOptions";
import { useSelector } from "react-redux";

interface SidebarDrawerProps {
    open: boolean;
    onClose: () => void;
}

const SidebarDrawer = ({ open, onClose }: SidebarDrawerProps) => {
    const {householdName} = useSelector((state: any) => state.auth);
    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="left"
            sx={{
                '@media (min-width: 768px)': {
                    display: 'none',
                },
                '& .MuiPaper-root': {
                    width: 280,
                    backgroundColor: 'var(--sidebar)',
                }
            }}
        >
            <div className="p-4 h-full flex flex-col">
                <LogoHeader isSidebarLogo={true} />
                <SideNavOptions />

                <div className="mt-auto">
                    <div 
                        className="font-medium text-sm px-4 py-2 rounded-lg w-fit mx-auto 
                        shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] bg-[#fff]"
                    >
                        <p className="ml-1">{householdName}</p>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default SidebarDrawer;
