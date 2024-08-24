const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const API_KEY = 'f39e3b4f83ec67c709b5fac98c16e786';
const swaggerSetup = require('./api-doc');


/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get current weather data for a city
 *     description: Fetches current weather data for the specified city using the Weatherstack API.
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the city to fetch weather data for
 *     responses:
 *       200:
 *         description: Successful response with weather data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 request:
 *                   type: object
 *                 location:
 *                   type: object
 *                 current:
 *                   type: object
 *       500:
 *         description: Failed to fetch weather data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 */
swaggerSetup(app);
app.get('/weather', async (req, res) => {
    const { city } = req.query;
    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: API_KEY,
                query: city
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
