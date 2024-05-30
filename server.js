
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
    


    // const apiUrl = `https://api.weatherbit.io/v2.0/history/hourly?lat=${latitude}&lon=${longitude}&start_date=${pastDate}&end_date=${data}&tz=local&key=bef3ac77ed6d41d2916eb1b2de000683`;

    const apiUrl = `https://api.weatherbit.io/v2.0/history/hourly?&city=${param1}&start_date=${pastDate}&end_date=${data}&tz=local&key=bef3ac77ed6d41d2916eb1b2de000683`;

    axios.get(apiUrl)
    .then(response2 => {
      // Access response data
      const data = response2.data.data[23].weather.description;
    //   console.log(data.data[2].weather.description);
    // const jsonString = JSON.stringify();
    console.log(data);
    if(data == "Few clouds" || data == "Overcast clouds" || data == "Broken clouds" ||
    data == "Clear Sky" || data == "Scattered clouds" 
    ){
      let data2 = "false";
      console.log(data2);
      res.send({ data: data2 });
    }else{
      let data2 = "true";
      console.log(data2);
      res.send({ data: data2 });

    }

    // res.json({ data: data });

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

// &city=Raleigh&country=US
// https://api.weatherbit.io/v2.0/current &city=Raleigh&country=US2&key=d21ca0a0f6094effa1f9c7fd5f8881ed&include=minutely


// https://api.weatherbit.io/v2.0/history/hourly?	&city=Raleigh,NC&start_date=2024-05-08&end_date=2024-05-09&tz=local&key=d21ca0a0f6094effa1f9c7fd5f8881ed
