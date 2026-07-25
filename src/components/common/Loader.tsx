import { CircularProgress } from "@mui/material"

const Loader = () => {
    return (
        <div className="w-screen h-dvh flex items-center justify-center">
            <CircularProgress color="inherit" aria-label="Loading…" />
        </div>
    )
}

export default Loader;