import { Chip, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

const Settings = () => {

    const {user, inviteCode} = useSelector((state: any) => state.auth);

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

            <div className="w-full h-[50%] min-[768px]:h-full min-[768px]:w-[50%] flex flex-col
            items-center justify-center gap-2">

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
            
        </Paper>
    )
}

export default Settings;