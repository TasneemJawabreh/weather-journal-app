
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Global Variables
const apiKey = 'b40249fadbea2017d6b7148c6c34197a'; 
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';


const getData = async (zip) => {
  try {
    const response = await fetch(`${url}${zip}&appid=${apiKey}`);
    const data = await response.json();
    

    if (data.cod === '404' || !data.main) {
      throw new Error('Invalid zip code');
    }
    
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null if there is error
  }
};

// Function to POST data
const postData = async ( url = '', data = {})=>{
    
  const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), 
});

  try {
    const newData = await response.json();
           return newData
  }catch(error) {
  console.log("error", error);
  // appropriately handle the error
  }
}
postData('/addData', {data:' the matrix', score: 5})
// Function to update UI
const updateUI = async () => {
  const request = await fetch('/data');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}°C`;
    document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`;
  } catch (error) {
    console.error("Error:", error);
    console.log("jjjjj");
  }
};

const clear = () => {
  document.getElementById('date').innerHTML = '';
  document.getElementById('temp').innerHTML = '';
  document.getElementById('content').innerHTML = '';

};

// Event listener for the generate button
document.getElementById('generate').addEventListener('click', performAction);

async function performAction() {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  const Data = await getData(zip);
  
  if (Data) {//if data is valid
    const temp =Data.main.temp;
    const temp_celsius = (temp - 273.15).toFixed(1);//convert from Kelvin to Celsius 
    await postData('/addData', {
      temperature: temp_celsius,
      date: new Date().toLocaleDateString(),
      userResponse: feelings,
    });
    await updateUI();
  } else {
    alert('Invalid zip code or weather data could not be fetched. Please try again.');
    clear(); // Clear the UI when there is error
  }
}
