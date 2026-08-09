import { CircularProgress } from "@mui/material"

const Loader = ({isButton}: {isButton?: boolean}) => {
    return (
        <div className={`w-full ${isButton ? '' : 'h-dvh'} flex items-center justify-center`}>
            <CircularProgress 
                size={isButton ? 24 : 40}
                sx={{ 
                    color: isButton ? '#fff' : 'var(--primary)' ,
                }} 
                aria-label="Loading..." 
            />
        </div>
    )
}

export default Loader;