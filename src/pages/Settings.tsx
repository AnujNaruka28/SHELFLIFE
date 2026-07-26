import { Chip, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const Settings = () => {

    const {user, inviteCode} = useSelector((state: any) => state.auth);
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


            </div>
            
        </Paper>
    )
}

export default Settings;