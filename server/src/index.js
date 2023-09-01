const express = require('express');
const app = express();
const cors = require('cors');
const port = 60839;

let updateData = {
    lasOutgoingtTx: null,
    currency: null,
    incidents: null
}

app.use(cors());

async function fetchGetter(url) {
    try {
        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json();
            const rsp = data;
            return rsp;
        } else {
            console.log('Error response:', response.message);
        }
    } catch (error) {
        console.error('Error request:', error.message);
    }
    return null;
}

async function getLastOutgoingTokenTransaction() {
    try {
        const ethereumAddress = '0x8225bbb6fd2637769404e2aa9af36bdb002c699f';
        const tokenContractAddress = '0xd8912c10681d8b21fd3742244f44658dba12264e';
        const apiUrl = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenContractAddress}&address=${ethereumAddress}&sort=desc`;
        const response = await fetchGetter(apiUrl);

        if (response && response.status === '1') {
            const transactions = response.result;
            const lastOutgoingTokenTx = transactions.find(transaction => transaction.to.toLowerCase() !== ethereumAddress.toLowerCase());

            if (lastOutgoingTokenTx) {
                updateData.lasOutgoingtTx = lastOutgoingTokenTx;
            } else {
                console.log('Any outgoing transaction found.');
            }
        } else {
            console.log('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getCurrencyData() {
    try {
        const apiUrl = `https://api.coingecko.com/api/v3/coins/pluton`;
        const data = await fetchGetter(apiUrl);

        if (data) {
            updateData.currency = {
                price: data.market_data.current_price,
                price_change_percentage_24h: data.market_data.price_change_percentage_24h,
                image: data.image,
                name: data.name,
                image: data.image,
            };
            console.log(updateData.currency)
        } else {
            console.log(`No data found for getCurrencyData`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getIncidents() {
    try {
        const apiUrl = `https://statuspage.incident.io/proxy/plutus`;
        const data = await fetchGetter(apiUrl);

        if (data) {
            updateData.incidents = data.summary;
        } else {
            console.log(`No data found for getIncidents`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// START TASKS
setInterval(getLastOutgoingTokenTransaction, 60000 * 5);
getLastOutgoingTokenTransaction();

setInterval(getCurrencyData, 60000 * 1);
getCurrencyData();

setInterval(getIncidents, 60000 * 5);
getIncidents();

// MIDDLEWARES
app.get('/', (req, res) => {
    res.status(200).send('API is running');
});

app.get('/lastwithdraw', (req, res) => {
    if (!updateData.lasOutgoingtTx) {
        res.status(404).send({ 'status': 'fail', 'message': 'Outgoing transaction not found.' });
        return;
    }
    res.status(200).send({ 'status': 'success', 'lasOutgoingtTx': updateData.lasOutgoingtTx });
})

app.get('/currency', (req, res) => {
    if (!updateData.currency) {
        res.status(404).send({ 'status': 'fail', 'message': 'Currency not found.' });
        return;
    }
    res.status(200).send({ 'status': 'success', 'Currency data': updateData.currency });
})

app.get('/incidents', (req, res) => {
    if (!updateData.incidents) {
        res.status(404).send({ 'status': 'fail', 'message': 'Incidents not found.' });
        return;
    }
    res.status(200).send({ 'status': 'success', 'incidents': updateData.incidents });
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
