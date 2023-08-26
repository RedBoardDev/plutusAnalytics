import React from 'react';
import { Box, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function TiersChart({ data }) {
    const colors = [
        "#1f77b4", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728",
        "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#aaffc3"
    ];
    const lastData = data?.filter(item => item.block_height === 17995140) || [];
    const activeTiers = {};
    lastData.forEach(element => {
        const tierName = element?.tier_name || undefined;
        const tierValue = element?.tier_value || '0';

        if (!activeTiers[tierName]) {
            activeTiers[tierName] = {};
        }
        activeTiers[tierName][tierValue] = parseInt(element.value);
    });
    const barData = Object.keys(activeTiers).map((tierName, index) => {
        const tierValues = activeTiers[tierName];
        const barEntry = { name: tierName };
        Object.keys(tierValues).forEach((tierValue, idx) => {
            barEntry[`DA ${idx}`] = tierValues[tierValue];
        });
        return barEntry;
    });

    return (
        <Box p={3}>
            <Paper elevation={5} style={{ background: '#f5f5f5' }}>
                <Box p={3}>
                    <Box mt={4} display="flex" justifyContent="center">
                        <BarChart
                            width={800}
                            height={370}
                            data={barData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {Object.keys(activeTiers).map((tierName, index) => (
                                <Bar
                                    key={tierName}
                                    dataKey={`DA ${index}`}
                                    stackId="a"
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </BarChart>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default TiersChart;
