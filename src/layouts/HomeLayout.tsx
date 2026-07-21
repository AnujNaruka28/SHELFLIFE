import { Outlet } from "react-router-dom";
import LogoHeader from "../components/common/LogoHeader";

const HomeLayout = () => {
    return (
        <main className="w-screen h-dvh overflow-hidden">

            <LogoHeader />

            <div className="w-full h-[calc(100vh-80px)] px-12 py-6
            flex flex-col justify-center item-center ">
                <Outlet/>
            </div>

        </main>
    )
}

export default HomeLayout;