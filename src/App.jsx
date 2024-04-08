import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true)


  const success = (pos) => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    }
    setCoords(obj);

  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = '26a4de3d52906a980a0d6409a55a0a33'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
      axios.get(url)
        .then(res => {
          const cel = (res.data.main.temp - 273.15).toFixed(2)
          const fah = (cel * 1.8 + 32).toFixed(2);
          setTemp({ cel, fah });
          setWeather(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false)
        });
    }
  }, [coords]);

  return (
    <div className='app'>
      {isLoading ?
        <h2>Loading</h2>
        :
        <WeatherCard
          weather={weather}
          temp={temp}
        />
      }
    </div>
  )
}

export default App
