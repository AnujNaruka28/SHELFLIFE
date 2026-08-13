// src/components/cores/Dashboard/LeaderBoard/Podium.tsx
import React from 'react';
import { Box, Stack, Avatar, Typography } from '@mui/material';
import { motion } from 'motion/react';
import goldMedal from '@/assets/gold-medal.svg';
import silverMedal from '@/assets/silver-medal.svg';
import bronzeMedal from '@/assets/bronze-medal.svg';
import type { LeaderboardRanking } from '../../../../types/Leaderboard';

interface PodiumProps {
  rankings: LeaderboardRanking[];
}

const Podium: React.FC<PodiumProps> = ({ rankings }) => {

    const top3 = rankings.slice(0, 3);
    const podiumOrder = [
        top3.find((r) => r.rank === 2),
        top3.find((r) => r.rank === 1),
        top3.find((r) => r.rank === 3),
    ].filter(Boolean) as LeaderboardRanking[];

    if (podiumOrder.length === 0) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%',
                    py: 8
                }}
            >
                <Typography variant="body1" color="text.secondary">
                    No leaderboard data available
                </Typography>
            </Box>
        );
    }

    const getMedalConfig = (rank: number) => {
        switch (rank) {
        case 1:
            return {
                svg: goldMedal,
                bgColor: '--primary',
                height: 160,
                avatarSize: 64,
            };
        case 2:
            return {
                svg: silverMedal,
                bgColor: '--chart-2',
                height: 120,
                avatarSize: 56,
            };
        case 3:
            return {
                svg: bronzeMedal,
                bgColor: '--muted',
                height: 100,
                avatarSize: 56,
            };
        default:
            return null;
        }
    };

    return (
        <Stack
            direction="row"
            sx={{ 
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: '100%', 
                py: 4 
            }}
            spacing={3}
        >
            {podiumOrder.map((ranking) => {
                const config = getMedalConfig(ranking.rank);
                if (!config) return null;

                const displayName = ranking.userName || `User ${ranking.userId.slice(0, 6)}`;
                const MedalSvg = config.svg;    

                return (
                    <Stack key={ranking.userId} sx={{ alignItems: 'center' }} spacing={2}>

                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={ranking.avatarUrl || undefined}
                                sx={{ width: config.avatarSize, height: config.avatarSize }}
                            >
                                {displayName.charAt(0)}
                            </Avatar>

                            <Box
                                component="img"
                                src={MedalSvg}
                                sx={{
                                    position: 'absolute',
                                    right: -8,
                                    bottom: -8,
                                    width: 32,
                                    height: 32,
                                }}
                            />
                        </Box>

                        <Typography 
                            variant="body2" 
                            sx={{ fontWeight: 600, textAlign: 'center' }}
                        >
                            {displayName}
                        </Typography>   

                        <Typography variant="caption" color="text.secondary">
                            {ranking.score}
                        </Typography>

                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: config.height }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                                width: 80,
                                backgroundColor: `var(${config.bgColor})`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transformOrigin: 'bottom',
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                sx={{ color: 'white', fontWeight: 'bold' }}
                            >
                                {ranking.rank}
                            </Typography>
                        </motion.div>

                    </Stack>
                );
            })}
        </Stack>
  );
};

export default Podium;