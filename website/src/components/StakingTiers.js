import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush, ReferenceLine, Label } from 'recharts';
import FullscreenChartButton from './FullscreenChartButton';
import CustomLegend from './CustomLegend';
import ChartComponentFullscreen from './ChartComponentFullscreen';

function StakingTiers({ data }) {
    const [activeTiers, setActiveTiers] = useState([
        "HERO", "VETERAN", "LEGEND", "MYTH", "GOAT", "HONEY"
    ]);
    const maxValue = Math.max(
        ...data.map(item => {
            const values = activeTiers.map(tier => Number(item[tier]) || 0);
            return Math.max(...values);
        })
    );

    const dateExplanations = {
        "01/07/2023": "1er difficulty\nadjustement",
        "07/08/2023": "Announce new\nreward plan",
        "01/10/2023": "2eme difficulty\nadjustement",
        "20/10/2023": "Remove difficulty\nadjustement",
    };

    const tierColors = {
        HERO: "#ff7300",
        VETERAN: "#245e35",
        LEGEND: "#f51167",
        MYTH: "#650d1b",
        GOAT: "#0012f4",
        HONEY: "#1d808a"
    };

    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <Box mt={3}>
            <Paper elevation={5} style={{ background: '#f0f0f0' }}>
                <Box p={3}>
                    <FullscreenChartButton onClick={toggleFullScreen} />
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
                            <YAxis domain={[0, maxValue]} />

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
            {isFullScreen ? (
                <ChartComponentFullscreen data={data} />
            ) : null}
        </Box>
    );
}

export default StakingTiers;
