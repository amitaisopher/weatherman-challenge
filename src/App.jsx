import { IoMdSearch } from 'react-icons/io'
import { ImSpinner8 } from 'react-icons/im'
import { useEffect, useRef, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IrradiationBarChart from "./components/IrradiationBarChart";
import { getWetaherHistory, getIrradiationForecast, getCurrentWeather } from './utils/dataFetching'
import WeatherCard from './components/WeatherCard';
import WeatherHistory from './components/WeatherHistory';
import TabPanel from './components/TabPanel';
import { a11yProps } from './utils/general'
import { calcIrridationDailyDelta } from './utils/general'
import SearchBar from './components/SearchBar'

const apiKey = 'YOUR_API_KEY_FOR_OPENWEATHER.COM'

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null)
  const [weatherHistoryData, setWeatherHistoryData] = useState(null)
  const [irradiationForecastData, setIrradiationForecastData] = useState(null)
  const [location, setLocation] = useState('Haifa')
  const [units, setUnits] = useState('metric')
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)
  const refreshIntervalInMs = 1800000 // 60 seconds * 30 minutes * 1000 milliseconds

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const inputHandler = (e) => {
    setInputValue(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (inputValue !== '') {
      setLocation(inputValue)
      setInputValue('')
      inputRef.current.value = ''
    } else {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    function updateData(location) {
      getCurrentWeather({ useDummyData: true, delay: 800, apiKey, location })
        .then(currentWeatherData => { setCurrentWeatherData(currentWeatherData) })
        .catch(err => { console.error(err) })
      getWetaherHistory({ useDummyData: true, delay: 800, apiKey, location })
        .then(weatherHistoryData => { setWeatherHistoryData(weatherHistoryData) })
        .catch(err => { console.error(err) })
      getIrradiationForecast({ useDummyData: true, delay: 800, apiKey })
        .then(irradiationForecastData => { setIrradiationForecastData(irradiationForecastData) })
        .catch(err => { console.error(err) })
    }
    updateData(location)
    const refreshTimer = setInterval(() => { updateData() }, refreshIntervalInMs)
    return () => {
      clearInterval(refreshTimer)
    }
  }, [location, units])
  if (!currentWeatherData) {
    return <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
      <div>
        <ImSpinner8 className="text-5xl animate-spin text-white" />
      </div>
    </div>
  }

  return (
    <div className="w-full h-full bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center px-4 lg:px-0">
      {/*form */}
      <SearchBar ref={inputRef} inputChangeHandler={inputHandler} submitSearchHandler={submitHandler} placeholderText='Search by city or country' />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="weather history and irradiation" centered textColor="inherit" className="w-max-[450px] mx-auto">
            <Tab label="Weather History" {...a11yProps(0)} />
            <Tab label="Irradiation" {...a11yProps(1)} />
            <Tab label="Current Weather" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <WeatherHistory>
            {weatherHistoryData?.list.map(weatherData => {
              return <WeatherCard
                key={weatherData.dt}
                city={weatherHistoryData?.city.name}
                country={weatherHistoryData?.city.country}
                date={new Date(weatherData.dt * 1000)}
                mainWeather={weatherData.weather.main}
                temp={weatherData?.temp.day}
                units={units}
                description={weatherData.weather.description}
                feelsLike={weatherData?.feels_like.day}
                humidity={weatherData?.humidity}
                visibility={weatherData?.visibility}
                windSpeed={weatherData?.speed} />
            })}
          </WeatherHistory>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="w-full mx-auto max-w-2xl bg-black/20 min-h-[568px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
            <IrradiationBarChart data={calcIrridationDailyDelta(irradiationForecastData, ['ghi', 'dni', 'dhi'])} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <WeatherCard
            city={currentWeatherData?.name}
            country={currentWeatherData?.sys.country}
            date={new Date()}
            mainWeather={currentWeatherData?.weather[0].main}
            temp={currentWeatherData?.main.temp}
            units={units}
            description={currentWeatherData?.weather[0].description}
            feelsLike={currentWeatherData?.main.feels_like}
            humidity={currentWeatherData?.main.humidity}
            visibility={currentWeatherData?.visibility}
            windSpeed={currentWeatherData?.wind.speed}
          />
        </TabPanel>
      </Box>
    </div>
  )
}

export default App
