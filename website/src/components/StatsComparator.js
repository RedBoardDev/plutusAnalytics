import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import DateRangePickerComponent from './DateRangePickerComponent';
import './statsComparator.css';

function StatsComparator({ data }) {
    const [todayDate, setTodayDate] = useState(null);
    const [yesterdayDate, setYesterdayDate] = useState(null);
    const [differences, setDifferences] = useState({});

    useEffect(() => {
        const newTodayStats = data.find(item => item.signed_at === yesterdayDate) || {};
        const newYesterdayStats = data.find(item => item.signed_at === todayDate) || {};

        const newDifferences = {};
        Object.keys(newTodayStats).forEach(key => {
            if (key !== 'signed_at' && key !== 'block_height') {
                const todayValue = parseInt(newTodayStats[key]) || 0;
                const yesterdayValue = parseInt(newYesterdayStats[key]) || 0;
                newDifferences[key] = todayValue - yesterdayValue;
            }
        });
        setDifferences(newDifferences);

    }, [data, yesterdayDate, todayDate])

    const handleDateRangeChange = (newtodayDate, newyesterdayDate) => {
        setTodayDate(newtodayDate);
        setYesterdayDate(newyesterdayDate);
    };

    const desiredOrder = ["HERO", "VETERAN", "LEGEND", "MYTH", "GOAT", "HONEY"];

    return (
        <Box mt={3} width={250}>
            <Paper elevation={5} style={{ background: '#f0f0f0' }}>
                <Box p={3}>
                    <Typography variant='h6' textAlign='center' gutterBottom>
                        Stats Comparator
                    </Typography>
                    <Box mt={2}>
                        {desiredOrder.map(key => {
                            if (key !== 'signed_at' && key !== 'block_height') {
                                const difference = differences[key];
                                const textClass = difference > 0 ? 'green-text' : difference < 0 ? 'red-text' : '';
                                return (
                                    <Box key={key} display="flex" justifyContent="space-between">
                                        <Typography>
                                            {key}
                                        </Typography>
                                        <Typography className={textClass}>
                                            {difference > 0 ? '+' : ''}{difference === 0 ? '-' : difference}
                                        </Typography>
                                    </Box>
                                );
                            }
                            return null;
                        })}
                    </Box>
                </Box>
                <DateRangePickerComponent onDateRangeChange={handleDateRangeChange} availableDates={data?.map(item => item.signed_at) || []} />
            </Paper>
        </Box>
    );
}

export default StatsComparator;
