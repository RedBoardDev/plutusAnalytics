import React from "react";
import { Box, Paper, Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function StakingEvolution({ data }) {
    return (
        <Box mt={3}>
            <Paper elevation={5} style={{ background: '#f0f0f0' }}>
                <Box p={3}>
                    <Typography variant='h6' align="center" gutterBottom>
                        Evolution of Staking
                    </Typography>
                    <Box mt={4} display="flex" justifyContent="center">
                        <AreaChart
                            width={900}
                            height={200}
                            data={data}
                            margin={{
                                left: 30,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="signed_at" />
                            <YAxis tickFormatter={value => value.toLocaleString()} />
                            <Tooltip
                                formatter={(value, name, props) => [`${value.toLocaleString()} PLU`]}
                            />
                            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" yAxisId="nonZeroStart" />
                            <YAxis
                                yAxisId="nonZeroStart"
                                domain={['dataMin', 'dataMax']}
                                tickFormatter={value => value.toLocaleString()}
                            />
                        </AreaChart>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default StakingEvolution;
