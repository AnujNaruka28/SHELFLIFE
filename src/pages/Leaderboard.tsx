// src/pages/Leaderboard.tsx
import { Paper, Stack } from "@mui/material";
import Podium from "../components/cores/Dashboard/LeaderBoard/Podium";
import Rankings from "../components/cores/Dashboard/LeaderBoard/Rankings";
import type { LeaderboardRanking } from "../types/Leaderboard";

const Leaderboard = () => {
  const rankings: LeaderboardRanking[] = [
    {
      userId: "1",
      userName: "John Doe",
      avatarUrl: "https://via.placeholder.com/150",
      score: 100,
      rank: 1
    },
    {
      userId: "2",
      userName: "Jane Smith",
      avatarUrl: "https://via.placeholder.com/150",
      score: 95,
      rank: 2
    },
    {
      userId: "3",
      userName: "Bob Johnson",
      avatarUrl: "https://via.placeholder.com/150",
      score: 88,
      rank: 3
    },
    {
      userId: "4",
      userName: "Alice Williams",
      avatarUrl: "https://via.placeholder.com/150",
      score: 82,
      rank: 4
    },
    {
      userId: "5",
      userName: "Charlie Brown",
      avatarUrl: "https://via.placeholder.com/150",
      score: 75,
      rank: 5
    },
    {
      userId: "6",
      userName: "Diana Davis",
      avatarUrl: "https://via.placeholder.com/150",
      score: 68,
      rank: 6
    },
    {
      userId: "7",
      userName: "Edward Miller",
      avatarUrl: "https://via.placeholder.com/150",
      score: 62,
      rank: 7
    },
    {
      userId: "8",
      userName: "Fiona Wilson",
      avatarUrl: "https://via.placeholder.com/150",
      score: 55,
      rank: 8
    },
    {
      userId: "9",
      userName: "George Taylor",
      avatarUrl: "https://via.placeholder.com/150",
      score: 48,
      rank: 9
    },
    {
      userId: "10",
      userName: "Hannah Anderson",
      avatarUrl: "https://via.placeholder.com/150",
      score: 42,
      rank: 10
    }
  ];

  return (
    <Paper className="w-full h-full overflow-hidden overflow-y-auto flex flex-col gap-4 p-4">
      <Stack spacing={4}>
        <Podium rankings={rankings.slice(0, 3)} />
        <Rankings rankings={rankings} />
      </Stack>
    </Paper>
  );
};

export default Leaderboard;