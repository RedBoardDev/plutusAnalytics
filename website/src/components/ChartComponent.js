import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush, ReferenceLine, Label } from 'recharts';
import CustomLegend from './CustomLegend';

function ChartComponent({ data }) {
    const [activeTiers, setActiveTiers] = useState([
        "HERO", "VETERAN", "LEGEND", "GOAT", "RESEARCHER", "EXPLORER", "ADVENTURER"
    ]);

    const dateExplanations = {
        "01/07/2023": "1er difficulty\nadjustement",
        "07/08/2023": "Announce new\nreward plan",
    };

    const tierColors = {
        HERO: "#ff7300",
        VETERAN: "#245e35",
        LEGEND: "#f51167",
        GOAT: "#0012f4",
        RESEARCHER: "#650d1b",
        EXPLORER: "#1d808a",
        ADVENTURER: "#b0b32e"
    };

    return (
        <Box mt={3}>
            <Paper elevation={5} style={{ background: '#f5f5f5' }}>
                <Box p={3}>
                    <Typography variant='h6' align="center" gutterBottom>
                        Staking Tiers
                    </Typography>
                    <CustomLegend activeTiers={activeTiers} setActiveTiers={setActiveTiers} tiersColors={tierColors} />
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
                            {activeTiers.map(tier => (
                                activeTiers.includes(tier) && (
                                    <Line
                                        key={tier}
                                        dot={false}
                                        type="monotone"
                                        dataKey={tier}
                                        stroke={tierColors[tier]}
                                    />
                                )
                            ))}
                            {Object.keys(dateExplanations).map(date => {
                                const explanation = dateExplanations[date];
                                const explanationLines = explanation.split('\n');
                                return (
                                    <ReferenceLine
                                        key={date}
                                        x={date}
                                        stroke="#003366"
                                        strokeDasharray="3 3"
                                        strokeWidth={2}
                                    >
                                        {explanationLines.map((line, index) => (
                                            <Label
                                                key={index}
                                                value={line}
                                                position="insideTopLeft"
                                                fill="#001633"
                                                fontSize={14}
                                                offset={10}
                                                dy={20 * index}
                                            />
                                        ))}
                                    </ReferenceLine>
                                );
                            })}
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
