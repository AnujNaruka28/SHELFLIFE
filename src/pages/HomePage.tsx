import { motion } from "motion/react";
import CTAButton from "../components/common/CTAButton";
import { lazy } from "react";
const LazyJoinDialog = lazy(() => import("../components/dialogs/JoinDialog"));

const Home = () => {
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
    </>
  );
};

export default Home;