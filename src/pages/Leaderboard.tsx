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

const useAppDispatch = () => useDispatch<AppDispatch>();

const Leaderboard = () => {

  const dispatch = useAppDispatch();
  const leaderboard: LeaderboardRanking[] = useSelector((state: any) => state.leaderboard.leaderboard);

  useEffect(() => {
    dispatch(leaderboardAction())
  },[dispatch])

  return (
    <Paper className="w-full h-full overflow-hidden overflow-y-auto flex flex-col gap-4 p-4">
      <Stack spacing={4}>
        <Podium rankings={leaderboard.slice(0, 3)} />
        <Rankings rankings={leaderboard} />
      </Stack>
    </Paper>
  );
};

export default Leaderboard;