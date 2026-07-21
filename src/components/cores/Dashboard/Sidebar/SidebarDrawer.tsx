import { Drawer } from "@mui/material";
import LogoHeader from "../../../common/LogoHeader";
import SideNavOptions from "./SideNavOptions";

interface SidebarDrawerProps {
    open: boolean;
    onClose: () => void;
}

const SidebarDrawer = ({ open, onClose }: SidebarDrawerProps) => {
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
            <div className="p-4">
                <LogoHeader isSidebarLogo={true} />
                <SideNavOptions />
            </div>
        </Drawer>
    );
};

export default SidebarDrawer;
