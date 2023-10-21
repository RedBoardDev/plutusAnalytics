import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const CustomRectangle = (props) => {
    const { x, y, width, height, fill } = props;

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            stroke={fill}
            strokeWidth={2}
            fillOpacity={0.8}
        />
    );
};

function TiersChart({ data }) {
    console.log("dd", data);
    const colors = [
        "#1f77b4", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728",
        "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#aaffc3"
    ];
    const lastBlockHeight = data ? data[data.length - 1]?.block_height : 0;
    const lastData = data?.filter(item => item.block_height === lastBlockHeight) || [];
    console.log("lastData", lastData)
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
        let total = 0;
        Object.keys(tierValues).forEach((tierValue, idx) => {
            barEntry[`DA 0`] = tierValues[tierValue];
            total += tierValues[tierValue];
        });
        barEntry['total'] = total;
        return barEntry;
    });
    const sortedBarData = barData.sort((a, b) => a.total - b.total);
    console.log(sortedBarData);

    return (
        <Box p={3}>
            <Paper elevation={5} style={{ background: '#f0f0f0' }}>
                <Box p={3}>
                    <Typography variant='h6' align="center" gutterBottom>
                        Staking per dynamic ajustement
                    </Typography>
                    <Typography variant='h8' align="center" gutterBottom>
                        This graphic will be update with current tier and old tiers difference soon
                    </Typography>
                    <Box mt={4} display="flex" justifyContent="center">
                        <BarChart
                            width={800}
                            height={370}
                            data={sortedBarData}
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
                                    shape={<CustomRectangle />}
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
