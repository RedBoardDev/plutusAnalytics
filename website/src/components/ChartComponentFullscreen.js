import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush, ReferenceLine, Label } from 'recharts';
import FullscreenChartButton from './FullscreenChartButton';
import CustomLegend from './CustomLegend';

function ChartComponentFullscreen({ data }) {
    const [activeTiers, setActiveTiers] = useState([
        "HERO", "VETERAN", "LEGEND", "GOAT", "RESEARCHER", "EXPLORER", "ADVENTURER"
    ]);

    const [isChartOpen, setIsChartOpen] = useState(true);
    const [chartWidth, setChartWidth] = useState(window.innerWidth);
    const [chartHeight, setChartHeight] = useState(window.innerHeight);

    const maxValue = Math.max(
        ...data.map(item => {
            const values = activeTiers.map(tier => Number(item[tier]) || 0);
            return Math.max(...values);
        })
    );

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

    const closeChartPopup = () => {
        setIsChartOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            const maxWidth = 1200;
            const maxHeight = 800;

            setChartWidth(Math.min(newWidth, maxWidth));
            setChartHeight(Math.min(newHeight, maxHeight));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Box mt={3}>
            <Dialog open={isChartOpen} onClose={closeChartPopup} fullScreen>
                <FullscreenChartButton onClick={closeChartPopup} />
                <DialogContent style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
                    <Typography variant='h6' align="center" gutterBottom>
                        Staking Tiers
                    </Typography>
                    <CustomLegend activeTiers={activeTiers} setActiveTiers={setActiveTiers} tiersColors={tierColors} />
                    <LineChart
                        width={chartWidth * 0.95}
                        height={chartHeight * 0.6}
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
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default ChartComponentFullscreen;
