import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function DateRangePickerComponent({ onDateRangeChange, availableDates }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (availableDates && availableDates.length >= 2) {
            console.log(availableDates[availableDates.length - 1])
            const today = dayjs(availableDates[availableDates.length - 1], 'DD/MM/YYYY').startOf('day');
            const yesterday = dayjs(availableDates[availableDates.length - 2], 'DD/MM/YYYY').startOf('day');
            setStartDate(yesterday);
            setEndDate(today);
        }

        if ((startDate && startDate.isValid()) && (endDate && endDate.isValid())) {
            onDateRangeChange(startDate.format('DD/MM/YYYY'), endDate.format('DD/MM/YYYY'));
        }
    }, [startDate, endDate, onDateRangeChange, availableDates]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const shouldDisableDate = (date) => {
        const formattedDate = date.format('DD/MM/YYYY');
        return !availableDates.includes(formattedDate);
    };

    return (
        <Box p={3} marginTop={-3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ marginBottom: '1vh' }}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        shouldDisableDate={shouldDisableDate}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                <div>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        shouldDisableDate={shouldDisableDate}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
            </LocalizationProvider>
        </Box>
    );
}

export default DateRangePickerComponent;
