import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function CustomLegend({ activeTiers, setActiveTiers }) {
    const tierColors = {
        HERO: "#ff7300",
        VETERAN: "#387908",
        LEGEND: "#f51167",
        GOAT: "#0012f4",
        RESEARCHER: "#650d1b",
        EXPLORER: "#0d656e",
        ADVENTURER: "#6e0d44"
    };

    const handleLegendClick = (tier) => {
        if (activeTiers.includes(tier)) {
            setActiveTiers(prev => prev.filter(t => t !== tier));
        } else {
            setActiveTiers(prev => [...prev, tier]);
        }
    };

    return (
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
            {Object.keys(tierColors).map(tier => (
                <Box key={tier} display="flex" alignItems="center">
                    <IconButton size="small" onClick={() => handleLegendClick(tier)}>
                        {activeTiers.includes(tier) ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                    </IconButton>
                    <Typography variant="body2" style={{ color: activeTiers.includes(tier) ? tierColors[tier] : '#ccc' }}>
                        {tier}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default CustomLegend;
