import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Box, Paper } from '@mui/material';
import CustomLegend from './CustomLegend';

function ChartComponent({ data }) {
    const [activeTiers, setActiveTiers] = useState([
        "HERO", "VETERAN", "LEGEND", "GOAT", "RESEARCHER", "EXPLORER", "ADVENTURER"
    ]);

    data.sort((a, b) => a.block_height - b.block_height);

    const transformedData = data.reduce((acc, current) => {
        const convertedDate = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(current.signed_at));

        const existingIndex = acc.findIndex(item => item.signed_at === convertedDate);

        if (existingIndex > -1) {
            acc[existingIndex][current.tier_name] = current.value;
        } else {
            acc.push({
                signed_at: convertedDate,
                [current.tier_name]: current.value
            });
        }

        return acc;
    }, []);

    return (
        <Box mt={3}>
            <Paper elevation={5} style={{ background: '#f5f5f5' }}>
                <Box p={3}>
                    <CustomLegend activeTiers={activeTiers} setActiveTiers={setActiveTiers} />
                    <Box mt={4} display="flex" justifyContent="center">
                        <LineChart
                            width={800}
                            height={400}
                            data={transformedData}
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
                        </LineChart>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default ChartComponent;
