import { motion } from "motion/react";
import CTAButton from "../components/common/CTAButton";
import { lazy, useEffect } from "react";
import useAuthAndHouseholdCheck from "../hooks/useAuthAndHouseholdCheck";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
const LazyJoinDialog = lazy(() => import("../components/dialogs/JoinDialog"));

const Home = () => {

  const {hasHousehold,loading,token} = useAuthAndHouseholdCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && hasHousehold) {
      navigate("/dashboard");
    } 
  }, [token,hasHousehold,navigate])

  if(loading) {
    return <Loader/>;
  }

  return (
    <>
      <CTAButton
        text="Create"
        className="py-1"
      />

      <div className="flex gap-2 items-center">
        <div className="w-full h-[1px] bg-border my-4"/>
        <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-muted-foreground">
          OR
        </motion.p>
        <div className="w-full h-[1px] bg-border my-4"/>
      </div>

      <LazyJoinDialog title="Join Household">
        <CTAButton
        text="Join"
        className="py-1"
        />
      </LazyJoinDialog>

      <div className="flex justify-end">
        <Link to="/register" className="text-blue-500 hover:underline">
          Don't have an account?
        </Link>
      </div>
    </>
  );
};

export default Home;