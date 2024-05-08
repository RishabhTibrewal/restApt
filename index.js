const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const weatherData = require("./data.json");
const port  = process.env.PORT || 8080;

app.get("/weatherData",(req, res) => {
    return res.json(weatherData[0]);
    // console.log(weatherData);
})

app.listen(port,() => console.log(`listening on port${port}`))
