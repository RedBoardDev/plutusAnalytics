import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ChartComponent from './components/ChartComponent';
import useTransformedData from './components/useTransformedData';
import ErrorBanner from './components/ErrorBanner';

function App() {
    const [visiblePoints] = useState(14);
    const [apiData, setApiData] = useState([]);
    const [tiersAggregatedData] = useTransformedData(apiData.tiers_aggregated || [], visiblePoints);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        const apiUrl = `https://plutus.thomasott.fr/api/statistics`;

        const fetchTimeout = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Timeout: The request took too long"));
            }, 10000);
        });

        Promise.race([fetch(apiUrl), fetchTimeout])
            .then(response => response.json())
            .then(fetchedData => {
                console.log(fetchedData);
                if (fetchedData.success === true) {
                    setApiData(fetchedData);
                } else {
                    setApiError(true);
                }
            })
            .catch(error => {
                setApiError(true);
            });
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f4f6f8"
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    gutterBottom
                    align="center"
                    style={{
                        padding: '2rem 0',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
                        fontSize: '2.5rem',
                        color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}>
                    Plutus tiers chart
                </Typography>

                {apiError &&
                    <ErrorBanner />
                }
                <ChartComponent data={tiersAggregatedData} visiblePoints={visiblePoints} />
            </Container>
        </Box>
    );
}

export default App;
