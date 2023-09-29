import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function PriceWidget() {
    const [currencyData, setCurrencyData] = useState(null);

    useEffect(() => {
        fetch('https://plutus.thomasott.fr/api/currency')
            .then(response => response.json())
            .then(data => setCurrencyData(data.data))
            .catch(error => console.error('Erreur lors de la requête API:', error));
    }, []);

    return (
        <Box mt={3}>
            <Paper elevation={5} style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center', borderRadius: '10px', height: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {currencyData ? (
                    <>
                        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "10px", marginBottom: "0.8rem", justifyContent: "center" }}>
                            <Box>
                                <img
                                    src={currencyData.image.large}
                                    alt={`${currencyData.name} logo`}
                                    style={{ width: "32px", height: "32px" }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {currencyData.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {currencyData.symbol}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "0.3rem", marginRight: "1.0rem" }}>
                                    ${(currencyData.price.usd).toFixed(3)}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: currencyData.price_change_percentage_24h > 0
                                        ? "rgba(0, 255, 0, 0.2)"
                                        : currencyData.price_change_percentage_24h < 0
                                            ? "rgba(255, 0, 0, 0.2)"
                                            : "rgba(0, 0, 0, 0.1)",
                                    borderRadius: "8px",
                                    padding: "0.2rem 0.5rem",
                                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color:
                                            currencyData.price_change_percentage_24h > 0
                                                ? "green"
                                                : currencyData.price_change_percentage_24h < 0
                                                    ? "red"
                                                    : "black",
                                    }}
                                >
                                    {currencyData.price_change_percentage_24h > 0 ? (
                                        <ArrowUpwardIcon sx={{ color: "green", verticalAlign: "top" }} />
                                    ) : currencyData.price_change_percentage_24h < 0 ? (
                                        <ArrowDownwardIcon sx={{ color: "red", verticalAlign: "top" }} />
                                    ) : (
                                        <ArrowRightIcon sx={{ color: "black", verticalAlign: "top" }} />
                                    )}
                                    {(currencyData.price_change_percentage_24h > 0 ? '+' : '') + currencyData.price_change_percentage_24h.toFixed(2)}%
                                </Typography>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1">Chargement des données...</Typography>
                )}
            </Paper>
        </Box>

    );
}

export default PriceWidget;
