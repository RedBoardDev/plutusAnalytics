import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ChartComponent from './components/ChartComponent';
import useTransformedData from './components/useTransformedData';
import ErrorBanner from './components/ErrorBanner';
import StatsComparator from './components/StatsComparator';
import TiersChart from './components/TiersChart';
import StackedChart from './components/StackedChart';
import WithdrawWidget from './components/WithdrawWidget';
import PriceWidget from './components/PriceWidget';
import DonationWidget from './components/DonationWidget';
import './App.css';

function App() {
    const [visiblePoints] = useState(14);
    const [apiData, setApiData] = useState([]);
    const [tiersAggregatedData] = useTransformedData(apiData.tiers_aggregated || [], visiblePoints);
    const [stakingData, setStakingData] = useState([]);
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
                if (fetchedData.success === true) {
                    setApiData(fetchedData);

                    const tmp = (fetchedData.staking || []).map(item => {
                        item.signed_at = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(item.signed_at));
                        return item;
                    });
                    setStakingData(tmp);
                } else {
                    setApiError(true);
                }
            })
            .catch(error => {
                console.error(error)
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
            bgcolor="#e3e6e8"
        >
            {apiError &&
                <ErrorBanner />
            }
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    gutterBottom
                    align="center"
                    style={{
                        padding: '2rem 0 1rem',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
                        fontSize: '3.0rem',
                        color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}>
                    Plutus analytics
                </Typography>
                {/* <DonationWidget /> */}
                <Box mt={0} display="center" justifyContent="center">
                    <WithdrawWidget />
                    <Box ml={3} />
                    <PriceWidget />
                </Box>

                <ChartComponent data={tiersAggregatedData} visiblePoints={visiblePoints} />
                <StackedChart data={stakingData} />

                <Box mt={0} display="flex">
                    <StatsComparator data={tiersAggregatedData} />
                    <TiersChart style={{ flex: 1 }} data={apiData.tiers} />
                </Box>
            </Container >
        </Box >
    );
}

export default App;
