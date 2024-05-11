
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/:param1', async (req, res) => {
    const param1 = req.params.param1;

  const options = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
    params: {
      address: param1,
      language: 'en'
    },
    headers: {
      'X-RapidAPI-Key': '37ed5f1cffmsh800765942c5aab6p14c405jsn257f39da14cd',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
  };

   
  try {
    response = await axios.request(options);
    latitude = response.data.results[0].location.lat;
    longitude = response.data.results[0].location.lng; 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const day = currentDate.getDate();

    const data = `${year}-${month}-${day}`;
    const pastDate = `${year}-${month}-${day-1}`
    console.log(data);
    console.log(pastDate);
    


    const apiUrl = `https://api.weatherbit.io/v2.0/history/hourly?lat=${latitude}&lon=${longitude}&start_date=${pastDate}&end_date=${data}&tz=local&key=d21ca0a0f6094effa1f9c7fd5f8881ed`;

    axios.get(apiUrl)
    .then(response2 => {
      // Access response data
      const data = response2.data.data[2].weather.description;
    //   console.log(data.data[2].weather.description);
    // const jsonString = JSON.stringify();
    console.log(data);

    res.send( data );

    })    
    console.log(latitude, longitude);
    // res.json({ latitude, longitude }); // Send latitude and longitude as JSON response
    // res.text({ success: true, data: secondApiData });
  } catch (error) {
    console.error('Error:', error);
    // Send an error response back to the client
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });