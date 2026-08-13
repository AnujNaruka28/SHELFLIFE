// src/pages/Leaderboard.tsx
import { Paper, Stack } from "@mui/material";
import Podium from "../components/cores/Dashboard/LeaderBoard/Podium";
import Rankings from "../components/cores/Dashboard/LeaderBoard/Rankings";
import type { LeaderboardRanking } from "../types/Leaderboard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { leaderboardAction } from "../lib/actions/dashboardAction";
import type { AppDispatch } from "../lib/store";
import Loader from "../components/common/Loader";

const useAppDispatch = () => useDispatch<AppDispatch>();

const Leaderboard = () => {

  const dispatch = useAppDispatch();
  const leaderboard: LeaderboardRanking[] = useSelector((state: any) => state.leaderboard.leaderboard) || [];
  const loading: boolean = useSelector((state: any) => state.leaderboard.loading) || false;

  useEffect(() => {
    dispatch(leaderboardAction())
  },[dispatch])

  if(loading) return <Loader />;

  return (
    <Paper className="w-full h-full overflow-hidden overflow-y-auto flex flex-col gap-4 p-4">
      <Stack spacing={2} sx={{
        ...(leaderboard.length > 0 ? { height: '100%' } : {})
      }}>
        <Podium rankings={leaderboard.slice(0, 3)} />
        <Rankings rankings={leaderboard} />
      </Stack>
    </Paper>
  );
};

export default Leaderboard;