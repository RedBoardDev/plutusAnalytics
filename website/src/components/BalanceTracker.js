import React, { useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';

function BalanceTracker({ data }) {

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (!data) return null;

    return (
        <Box mt={3} display="flex" justifyContent="center">
            {data.map((element, index) => (
                <Paper elevation={5} style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center', borderRadius: '10px', width: '300px', marginLeft: '10px' }}>
                    <div key={index}>
                        <Typography variant="h6" style={{ marginBottom: '15px', fontWeight: 'bold', color: '#333' }}>
                            {element.name}
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: '18px' }}>
                            {element.value.toFixed(2)} PLU
                        </Typography>
                    </div>
                </Paper>
            ))}
        </Box>
    );
}

export default BalanceTracker;
