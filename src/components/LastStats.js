import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import './LastStats.css';

function LastStats({ data }) {
    const lastDayStats = data[data.length - 1] || {};
    const last2DayStats = data[data.length - 2] || {};

    const differences = {};
    Object.keys(lastDayStats).forEach(key => {
        if (key !== 'signed_at' && key !== 'block_height') {
            const lastDayValue = parseInt(lastDayStats[key]) || 0;
            const last2DayValue = parseInt(last2DayStats[key]) || 0;
            differences[key] = lastDayValue - last2DayValue;
        }
    });

    return (
        <Box mt={3}>
            <Paper elevation={5} style={{ background: '#f5f5f5' }}>
                <Box p={3}>
                    <Typography variant="h6" gutterBottom textAlign='center' >
                        Last Day Stats
                    </Typography>
                    <Box mt={2}>
                        {Object.keys(lastDayStats).map(key => {
                            if (key !== 'signed_at' && key !== 'block_height') {
                                const difference = differences[key];
                                const textClass = difference > 0 ? 'green-text' : difference < 0 ? 'red-text' : '';
                                return (
                                    <Box key={key} display="flex" justifyContent="space-between">
                                        <Typography>
                                            {key}
                                        </Typography>
                                        <Typography className={textClass}>
                                            {difference > 0 ? '+' : ''}{difference === 0 ? '-' : difference}
                                        </Typography>
                                    </Box>
                                );
                            }
                            return null;
                        })}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default LastStats;
