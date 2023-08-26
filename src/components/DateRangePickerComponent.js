import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

function DateRangePickerComponent({ onDateRangeChange, availableDates }) {
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');

    const [startDate, setStartDate] = useState(yesterday);
    const [endDate, setEndDate] = useState(today);

    useEffect(() => {
        if ((startDate && startDate.isValid()) && (endDate && endDate.isValid())) {
            onDateRangeChange(startDate.format('DD/MM/YYYY'), endDate.format('DD/MM/YYYY'));
        }
    }, [startDate, endDate, onDateRangeChange]);

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
