import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomRectangle = (props) => {
    const { x, y, width, height, fill } = props;
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            stroke="none"
            strokeWidth={width === 0 ? 0 : 1}
            fillOpacity={1}
        />
    );
};

function RedeemChart({ data }) {
    const colors = [
        "#1f77b4",
        "#8884d8",
    ];

    const formattedData = data.map((item) => ({
        date: new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(item.signed_at)),
        'daily redeem': item.value,
        'total redeem': item.sum
    }));

    return (
        <Box p={3}>
            <Paper elevation={5} style={{ background: '#f0f0f0' }}>
                <Box p={3}>
                    <Typography variant='h6' align="center" gutterBottom>
                        Evolution of Redeem
                    </Typography>
                    <Box mt={4} display="flex" justifyContent="center">
                        <ComposedChart
                            width={900}
                            height={400}
                            data={formattedData}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                                formatter={(value, name, props) => [`${value.toLocaleString()} PLU`]}
                            />
                            <Legend />
                            <Bar
                                dataKey="daily redeem"
                                fill={colors[0]}
                                shape={<CustomRectangle />}
                            />
                            <Line
                                type="monotone"
                                dataKey="total redeem"
                                stroke={colors[1]}
                                dot={false}
                                strokeWidth={2}
                            />
                        </ComposedChart>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default RedeemChart;
