import { motion } from "motion/react";
import ShelfLifeLogo from "./assets/shelf-life-main.svg";
import CTAButton from "./components/common/CTAButton";
import { lazy } from "react";
const LazyJoinDialog = lazy(() => import("./components/dialogs/JoinDialog"));

const App = () => {

  return (
    <section className="w-screen h-screen overflow-hidden">

      <motion.div 
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      className="w-full h-[80px] flex flex-col items-center justify-center gap-2 mt-2">
        <img 
          src={ShelfLifeLogo} 
          alt="ShelfLife Logo" 
          width={48}
          height={48} 
          className="border-border border rounded-lg px-1 py-0.5 bg-muted"
        />
        <motion.h1
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        className="font-bold text-foreground tracking-wider leading-tight"> 
          ShelfLife
        </motion.h1>
      </motion.div>

      <div className="w-full h-[calc(100vh-80px)] px-12 py-6 
      flex flex-col justify-center item-center ">
        
        <CTAButton
          text="Create"
          className="py-1"
        />

        <div className="flex gap-2 items-center">
          <div className="w-full h-[1px] bg-border my-4"/>
          <motion.p
          initial={{ translateZ: -100, opacity: 0 }}
          animate={{ translateZ: 0, opacity: 1 }}
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
      </div>


    </section>
  )
};

export default App;