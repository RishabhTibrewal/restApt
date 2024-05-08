// Define the API URL
const apiUrl = 'https://api.weatherbit.io/v2.0/history/hourly?lat=35.775&lon=-78.638&start_date=2024-05-03&end_date=2024-05-04&tz=local&key=d21ca0a0f6094effa1f9c7fd5f8881ed';

// Make a GET request
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data.data[0].weather.description, data.data[1].weather.description);
    console.log(data.data[2].weather.description);
    console.log(data.data[3].weather.description);
    console.log(data.data[4].weather.description);
    console.log(data.data[5].weather.description);
    console.log(data.data[6].weather.description);
    console.log(data.data[7].weather.description);
    console.log(data.data[8].weather.description);
    console.log(data.data[9].weather.description);
    console.log(data.data[10].weather.description);
    console.log(data.data[11].weather.description);

  })
  .catch(error => {
    console.error('Error:', error);
  });