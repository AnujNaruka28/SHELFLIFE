// src/components/cores/Dashboard/LeaderBoard/Rankings.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import goldMedal from '@/assets/gold-medal.svg';
import silverMedal from '@/assets/silver-medal.svg';
import bronzeMedal from '@/assets/bronze-medal.svg';
import type { LeaderboardRanking } from '../../../../types/Leaderboard';

interface RankingsProps {
  rankings: LeaderboardRanking[];
  currentUserId?: string;
}

const Rankings: React.FC<RankingsProps> = ({ rankings, currentUserId }) => {
  const getMedalForRank = (rank: number) => {
    switch (rank) {
      case 1: return goldMedal;
      case 2: return silverMedal;
      case 3: return bronzeMedal;
      default: return null;
    }
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>User</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankings.map((ranking) => {
              const displayName = ranking.userName || `User ${ranking.userId.slice(0, 6)}`;
              const medal = getMedalForRank(ranking.rank);
              const isCurrentUser = currentUserId === ranking.userId;

              return (
                <TableRow
                  key={ranking.userId}
                  sx={{
                    backgroundColor: isCurrentUser ? 'action.selected' : 'inherit',
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx = {{ fontWeight : 600 }}>
                        #{ranking.rank}
                      </Typography>
                      {medal && (
                        <Box
                          component="img"
                          src={medal}
                          sx={{ width: 20, height: 20 }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={ranking.avatarUrl || undefined}
                        sx={{ width: 32, height: 32 }}
                      >
                        {displayName.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">
                        {displayName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx = {{ fontWeight : 600 }}>
                      {ranking.score}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Rankings;