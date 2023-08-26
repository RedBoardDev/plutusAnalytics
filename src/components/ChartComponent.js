import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush } from 'recharts';
import CustomLegend from './CustomLegend';

function ChartComponent({ data }) {
    const [activeTiers, setActiveTiers] = useState([
        "HERO", "VETERAN", "LEGEND", "GOAT", "RESEARCHER", "EXPLORER", "ADVENTURER"
    ]);

    return (
        <Box mt={3}>
            <Paper elevation={5} style={{ background: '#f5f5f5' }}>
                <Box p={3}>
                    <Typography variant='h6' align="center" gutterBottom>
                        Staking Tiers
                    </Typography>
                    <CustomLegend activeTiers={activeTiers} setActiveTiers={setActiveTiers} />
                    <Box mt={4} display="flex" justifyContent="center">
                        <LineChart
                            width={900}
                            height={400}
                            data={data}
                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                        >
                            <XAxis dataKey="signed_at" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#aaa" strokeDasharray="3 3" />
                            {activeTiers.includes("HERO") && <Line type="monotone" dataKey="HERO" stroke="#ff7300" />}
                            {activeTiers.includes("VETERAN") && <Line type="monotone" dataKey="VETERAN" stroke="#387908" />}
                            {activeTiers.includes("LEGEND") && <Line type="monotone" dataKey="LEGEND" stroke="#f51167" />}
                            {activeTiers.includes("GOAT") && <Line type="monotone" dataKey="GOAT" stroke="#0012f4" />}
                            {activeTiers.includes("RESEARCHER") && <Line type="monotone" dataKey="RESEARCHER" stroke="#650d1b" />}
                            {activeTiers.includes("EXPLORER") && <Line type="monotone" dataKey="EXPLORER" stroke="#0d656e" />}
                            {activeTiers.includes("ADVENTURER") && <Line type="monotone" dataKey="ADVENTURER" stroke="#6e0d44" />}
                            <Brush
                                dataKey="signed_at"
                                height={40}
                                stroke="#d0d0d0"
                                travellerWidth={24}
                                gap={5}
                                travellerProps={{
                                    width: 20,
                                    height: 20,
                                    y: -5,
                                }}
                                fill="#f5f5f5"
                            />
                        </LineChart>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default ChartComponent;
