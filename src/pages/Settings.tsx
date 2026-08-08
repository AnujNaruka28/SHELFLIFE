import { Chip, Paper, TextField, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import CTAButton from "../components/common/CTAButton";
import { FiLogOut } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/features/authSlice";
import type { AppDispatch } from "../lib/store";

const useAppDispatch = () => useDispatch<AppDispatch>();

const Settings = () => {

    const {user, inviteCode} = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCopy = async () => {

        try {

            if(!inviteCode) {
                toast.error("No invite code available");
                return;
            }
            await navigator.clipboard.writeText(inviteCode);
            toast.success("Copied Invite Code Successfully.");
        } catch (error) {
            toast.error("Failed to copy invite code.");
        }
    
    }

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("persist:root");
        navigate("/login");
    }

    return (
        <Paper sx={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            '@media (min-width: 768px)': {
                flexDirection: 'row'
            }
        }}>

            <div className="w-full h-[50%] min-[768px]:h-full min-[768px]:w-[50%] flex flex-col
            items-center justify-center gap-6">

                <img src={user.profileImage?.secure_url || ""} alt="" 
                className="w-48 h-48 rounded-full"/>

                <div className="flex gap-2 items-center font-medium text-lg">
                    {user?.name}
                    <span>
                        <Chip label={user?.role} sx={{
                            color: "#212022"
                        }}/> 
                    </span>
                </div>

            </div>

            <div className="flex-col flex w-full min-[768px]:w-[50%] h-[50%] min-[768px]:h-full">
                
                <div className="w-full h-[50%] min-[768px]:h-[50%] min-[768px]:w-[80%] flex flex-col
                items-center justify-center min-[768px]:justify-end gap-2">

                    <TextField
                        disabled
                        id="standard-disabled"
                        label="Email"
                        defaultValue={user?.email || ""}
                        variant="standard"
                        sx={{
                            width: '80%'
                        }}
                    />

                    <div className="w-full flex items-center justify-center gap-2 relative">
                        <TextField
                            disabled
                            id="standard-disabled"
                            label="Invite Code"
                            defaultValue={inviteCode || ""}
                            variant="standard"
                            sx={{
                                width: '80%'
                            }}
                        />  

                        <MdContentCopy onClick={handleCopy} className="absolute right-2 cursor-pointer w-4 h-4" />

                    </div>

                </div>

                <div className="w-full h-[50%] min-[768px]:h-[50%] min-[768px]:w-[80%] flex
                items-center justify-between px-4 mb-2">

                    <div className="flex flex-col items-center gap-2">
                            
                        <Tooltip title="Exit Household">
                            <CTAButton
                                reactNode={<ImExit className="h-4 w-4" />}
                                className="p-3 rounded-full bg-primary text-primary-foreground"
                            />
                        </Tooltip>

                        <p className="text-sm">
                            Exit
                        </p>    

                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Tooltip title="Logout">
                            <CTAButton
                                reactNode={<FiLogOut className="h-4 w-4" />}
                                className="p-3 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20"
                                onClick={handleLogout}
                            />
                        </Tooltip>
                    
                        <p className="text-sm">
                            Logout
                        </p>

                    </div>

                </div>

            </div>

            
        </Paper>
    )
}

export default Settings;