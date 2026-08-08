import { CircularProgress } from "@mui/material"

const Loader = ({isButton}: {isButton?: boolean}) => {
    return (
        <div className={`w-full ${isButton ? '' : 'h-dvh'} flex items-center justify-center`}>
            <CircularProgress sx={{ 
                color: isButton ? '#fff' : 'var(--primary)' ,
                width: isButton ? '24px' : '40px',
                height: isButton ? '24px' : '40px'
            }} aria-label="Loading..." />
        </div>
    )
}

export default Loader;