import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ChartComponent from './ChartComponent';
// import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = `https://plutus.thomasott.fr/api/statistics`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(fetchedData => {
        if (fetchedData.success === true) {
          setData(fetchedData.result || []);
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données:", error);
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

        <ChartComponent data={data} />
      </Container>
    </Box>
  );
}

export default App;
