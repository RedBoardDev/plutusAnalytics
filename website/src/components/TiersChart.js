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
    const colors = [
        "#1f77b4", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728",
        "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#aaffc3"
    ];
    const lastBlockHeight = data ? data[data.length - 1]?.block_height : 0;
    const lastData = data?.filter(item => item.block_height === lastBlockHeight) || [];
    const activeTiers = {};
    lastData.forEach(element => {
        const tierName = element?.tier_name || undefined;
        const tierDescription = element?.description || undefined;

        if (!activeTiers[tierName]) {
            activeTiers[tierName] = {};
        }
        activeTiers[tierName][tierDescription] = parseInt(element.value);
    });

    let barLabels = [];

    const barData = Object.keys(activeTiers).map((tierName, index) => {
        const tierValues = activeTiers[tierName];
        const barEntry = { name: tierName };
        let total = 0;

        Object.keys(tierValues).forEach((tierValue, idx) => {
            const tierName2 = Object.keys(tierValues)[idx];

            if (!barLabels.includes(tierName2)) {
                barLabels.push(tierName2);
            }

            // barEntry[tierName2] = tierValues[tierName2];
            total += tierValues[tierName2];
        });
        barEntry['total'] = total;
        return barEntry;
    });

    const sortedBarData = barData.sort((a, b) => a.total - b.total);
    console.log(barLabels, sortedBarData);
    return (
        <Box p={3}>
            <Paper elevation={5} style={{ background: '#f0f0f0' }}>
                <Box p={3}>
                    <Typography variant='h6' align="center" gutterBottom>
                        Staking per dynamic ajustement
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
                                <Bar
                                    key={'total'}
                                    dataKey={'total'}
                                    stackId="a"
                                    fill={colors[0 % colors.length]}
                                    shape={<CustomRectangle />}
                                />
                        </BarChart>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default TiersChart;