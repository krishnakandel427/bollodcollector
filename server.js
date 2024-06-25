const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.clashofclans.com/v1';

const fetchFromAPI = async (endpoint) => {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });
    return response.data;
};

app.get('/clan/:clanTag', async (req, res) => {
    const { clanTag } = req.params;
    try {
        const clanData = await fetchFromAPI(`/clans/%23${clanTag}`);
        res.json(clanData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clan data' });
    }
});

app.get('/clan/:clanTag/members', async (req, res) => {
    const { clanTag } = req.params;
    try {
        const membersData = await fetchFromAPI(`/clans/%23${clanTag}/members`);
        res.json(membersData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch members data' });
    }
});

app.get('/clan/:clanTag/warlog', async (req, res) => {
    const { clanTag } = req.params;
    try {
        const warlogData = await fetchFromAPI(`/clans/%23${clanTag}/warlog`);
        res.json(warlogData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch warlog data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
