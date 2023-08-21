import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Paper } from '@mui/material';

function ChartComponent({ data }) {
    // Transformez les données pour le format requis par Recharts
    const transformedData = data.reduce((acc, current) => {
        const existingIndex = acc.findIndex(item => item.block_height === current.block_height);

        if (existingIndex > -1) {
            acc[existingIndex][current.tier_name] = current.value;
        } else {
            acc.push({
                block_height: current.block_height,
                [current.tier_name]: current.value
            });
        }

        return acc;
    }, []);

    return (
        <Paper style={{ padding: '1rem' }}>
            <LineChart
                width={800}
                height={400}
                data={transformedData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <XAxis dataKey="block_height" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Legend />
                <Line type="monotone" dataKey="HERO" stroke="#ff7300" />
                <Line type="monotone" dataKey="VETERAN" stroke="#387908" />
                <Line type="monotone" dataKey="LEGEND" stroke="#f51167" />
                <Line type="monotone" dataKey="GOAT" stroke="#0012f4" />
                <Line type="monotone" dataKey="RESEARCHER" stroke="#650d1b" />
                <Line type="monotone" dataKey="EXPLORER" stroke="#0d656e" />
                <Line type="monotone" dataKey="ADVENTURER" stroke="#6e0d44" />
            </LineChart>
        </Paper>
    );
}

export default ChartComponent;
