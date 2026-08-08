export interface LeaderboardRanking {
  userId: string;
  userName: string | null;
  rank: number;
  score: number;
  avatarUrl?: string | null;
}