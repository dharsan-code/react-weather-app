import {useState} from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const apiKey = "6867e5d709fd9ce02de3ea115a2b799d";
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
  if (!city) return;
  try{
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then((response)=> response.json())
    .then((data)=> setWeather(data));
    console.log("Weather data: ", weather);
  }
  catch(error){
    console.error("Error fetching weather data: ", error);
  }
  }

  const weatherImage = (id) => {
       if (id >= 200 && id <= 622) return `${process.env.PUBLIC_URL}/images/rainy.png`;
       if (id === 800) return `${process.env.PUBLIC_URL}/images/sunny.png`;
       return `${process.env.PUBLIC_URL}/images/cloudy.png`;
  }
  return (
    <>
      <section className="App">
        <div className="App-header">
          <div className="card" >
            <h1>Weather Tracker</h1>
              <div className="d-flex flex-column align-items-center card-head mt-3 gap-2">
                <input 
                  type="text" 
                  className="form-control w-50" 
                  placeholder="Enter city name..." 
                  onChange={(e) => setCity(e.target.value)} 
                  value={city}
                  onKeyDown={(e) => e.key === "Enter" && getWeather()}
                
                />
                <button  className="btn btn-primary" onClick={getWeather}>Get Weather</button>
              </div>
              {weather && weather.main ? (
                <>
                <div className="d-flex justify-content-center mt-4 card-head">
                  <img  className="img-original" src={weatherImage(weather.weather[0].id)} alt={weather.weather[0].description} />
                </div>
                    <div className="card-body mt-0"> 
                    <h5 className="card-title">{weather.weather[0].description}</h5> in 
                    <h5 className="card-title">{weather.name}</h5> 
                    <h6 className="card-title">Temperature: {(weather.main.temp - 273.15).toFixed(1)}°C</h6>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="card-text ">
                        <p className="mb-0 name"><b>{weather.wind.speed} Km/h</b></p>
                        <p className="mb-0 detail">Wind speed</p> 
                      </div>
                      <div className="card-text ">
                        <p className="mb-0 name"><b>{weather.main.humidity}%</b></p>
                        <p className="mb-0 detail">Humidity</p> 
                      </div>
                    </div>
                    <p className="mb-0 para">Designed by <span className="name">Dharsan</span></p>
                  </div>
                </>
              ) : (
                <>
                <div className="d-flex justify-content-center mt-4 card-head">
                   <img className="img-original" src={`${process.env.PUBLIC_URL}/images/cloudy.png`} alt="cloudy" />
                </div> 
                    <div className="card-body mt-0"> 
                    <h5 className="card-title">Temperature: 0 °C</h5>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="card-text ">
                        <p className="mb-0 name"><b>0 Km/h</b></p>
                        <p className="mb-0 detail">Wind speed</p> 
                      </div>
                      <div className="card-text ">
                        <p className="mb-0 name"><b>0 %</b></p>
                        <p className="mb-0 detail">Humidity</p> 
                      </div>
                    </div>
                    <p className="mb-0 para">Designed by <span className="name">Dharsan</span></p>
                  </div>
                </>
              )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
