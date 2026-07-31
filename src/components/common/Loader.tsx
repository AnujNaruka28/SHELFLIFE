import { CircularProgress } from "@mui/material"

const Loader = () => {
    return (
        <div className="w-full h-dvh flex items-center justify-center">
            <CircularProgress sx={{ color: "var(--primary)" }} aria-label="Loading…" />
        </div>
    )
}

export default Loader;