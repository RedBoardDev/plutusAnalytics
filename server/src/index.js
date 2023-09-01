const express = require('express');
const app = express();
const port = 60839;

let updateData = {
    lasOutgoingtTx: null,
    price: null,
    incidents: null
}

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

async function getCurrencyPrice() {
    try {
        const apiUrl = `https://api.coingecko.com/api/v3/coins/pluton`;
        const data = await fetchGetter(apiUrl);

        if (data) {
            updateData.price = data.market_data.current_price;
        } else {
            console.log(`No data found for getLastCurrencyPrice`);
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

setInterval(getCurrencyPrice, 60000 * 1);
getCurrencyPrice();

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

app.get('/price', (req, res) => {
    if (!updateData.price) {
        res.status(404).send({ 'status': 'fail', 'message': 'Price not found.' });
        return;
    }
    res.status(200).send({ 'status': 'success', 'price': updateData.price });
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
