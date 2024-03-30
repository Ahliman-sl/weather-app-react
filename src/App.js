import { useState } from "react";
import clear from "./images/clear.png";
import clouds from "./images/clouds.png";
import drizzle from "./images/drizzle.png";
import humidity from "./images/humidity.png";
import mist from "./images/mist.png";
import rain from "./images/rain.png";
// import search from "./images/search.png";
import snow from "./images/snow.png";
import wind from "./images/wind.png";
export default function App() {
  return (
    <div className="w-full  h-screen bg-cyan-950 flex justify-center items-center">
      <div></div>
      <WeatherApp />
    </div>
  );
}

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(" ");
  const API_KEY = "141d767b1238a104d605da18b8197011";

  function handleInputChange(e) {
    setCity(e.target.value);
  }

  async function fetchWeatherData() {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_KEY}`
      );
      if (!res.ok) {
        throw new Error("City ​​not found");
      }
      const data = await res.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  function weatherConditions() {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
      return null;
    }

    const mainWeather = weatherData.weather[0].main;

    switch (mainWeather) {
      case "Clear":
        return clear;
      case "Clouds":
        return clouds;
      case "Drizzle":
        return drizzle;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Mist":
        return mist;
      case "Haze":
        return mist; // Haze için mist resmini kullanıyorum, istediğiniz gibi ayarlayabilirsiniz
      default:
        return null; // Diğer durumlarda resim bulunamadı olarak null döndür
    }
  }
  return (
    <div className=" w-[40rem]  h-max m-5 bg-indigo-700 rounded-md flex flex-col font-slackside">
      <SearchBar
        city={city}
        handleInputChange={handleInputChange}
        onClick={fetchWeatherData}
      />
      <Temperature
        weatherData={weatherData}
        weatherConditions={weatherConditions}
      />
    </div>
  );
}

function SearchBar({ city, handleInputChange, onClick }) {
  return (
    <div className="w-full h-max mt-5 flex flex-col sm:flex-row justify-center items-center gap-4 ">
      <input
        className="sm:w-[20rem] sm:h-[4.4rem] w-[10rem] h-[3rem] rounded-full bg-stone-200 text-3xl pl-5 font-semibold text-sky-700 placeholder:text-sky-700 shadow-indigo-950 shadow-md outline-none "
        placeholder="Search..."
        value={city}
        onChange={handleInputChange}
      ></input>
      <button
        onClick={onClick}
        className="px-3 py-3 rounded-full bg-stone-200 shadow-indigo-950 shadow-md "
      >
        🔍
      </button>
    </div>
  );
}

function Temperature({ weatherData, weatherConditions }) {
  return (
    <div className=" w-full h-max mt-5 mb-6  sm:mt-1 sm:mb-3 flex flex-col justify-center items-center  text-stone-200 sm:gap-2">
      <img
        className="w-[5rem] h-[5rem] sm:w-[15rem] sm:h-[15rem]"
        src={weatherConditions() || clouds}
        alt="weather images"
      />
      <p className="font-semibold text-[3rem] sm:text-[7rem]">
        {weatherData?.main?.temp || 26}°C
      </p>
      <h1 className="font-bold text-4xl sm:text-4xl md:text-6xl  tracking-widest ">
        {weatherData?.name || "Istanbul"}
      </h1>
      <div className=" w-full mt-5  h-max flex  justify-around items-center font-semibold text-2xl sm:text-4xl min-[0px]: max-[500px]:flex-col gap-5">
        <span className="flex gap-4 sm:gap-4 text-center  items-center justify-center">
          <img
            className="sm:w-10 sm:h-10 w-7 h-7"
            src={humidity}
            alt="humidity"
          />
          <span className="flex flex-col sm:gap-4 ">
            <p>{weatherData?.main?.humidity || "24"}%</p>
            <p>Humidity</p>
          </span>
        </span>
        <span className="flex text-center gap-1 sm:gap-4 items-center justify-center ">
          <img className="sm:w-10 sm:h-10 w-7 h-7" src={wind} alt="humidity" />
          <span className="flex flex-col gap-4">
            <p>{weatherData?.wind?.speed || 16} km/h</p>
            <p>Wind Speed</p>
          </span>
        </span>
      </div>
    </div>
  );
}
