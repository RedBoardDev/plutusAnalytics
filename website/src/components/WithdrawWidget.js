import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';

function WithdrawWidget() {
    const [withdrawData, setWithdrawData] = useState(null);

    useEffect(() => {
        fetch('https://plutus.thomasott.fr/api/lastwithdraw')
            .then(response => response.json())
            .then(data => setWithdrawData(data.lasOutgoingtTx))
            .catch(error => console.error('Error during API request:', error));
    }, []);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

    const formatValue = (value, decimal) => {
        const formattedValue = (value / 10 ** decimal).toLocaleString({ minimumFractionDigits: 2 });
        return `${formattedValue} ${withdrawData.tokenSymbol}`;
    };

    return (
        <Box mt={3}>
            <Paper elevation={5} style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center', borderRadius: '10px', height: '110px' }}>
                {withdrawData ? (
                    <div>
                        <Typography variant="h5" style={{ marginBottom: '15px', fontWeight: 'bold', color: '#333' }}>
                            Last top-up
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: '18px', marginBottom: '10px' }}>
                            {formatDate(withdrawData.timeStamp)}
                        </Typography>
                        <Typography variant="body1" style={{ fontSize: '18px' }}>
                            Amount: {formatValue(withdrawData.value, withdrawData.tokenDecimal)}
                        </Typography>
                    </div>
                ) : (
                    <Typography variant="body1">Loading...</Typography>
                )}
            </Paper>
        </Box>
    );
}

export default WithdrawWidget;
