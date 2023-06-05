import currentWeatherDummyData from "../dummyData/currentWeather";
import weatherHistoryDummyData from "../dummyData/weatherHistory";
import irradiationForecastDummyData from "../dummyData/irradiationForecast";
import axios from "axios";

export async function getCurrentWeather({
  useDummyData = false,
  delay = 0,
  apiKey = "",
  units = "metric",
  location = "haifa",
}) {
  const currentWeaherEndpointurl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;
  if (useDummyData) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(currentWeatherDummyData);
      }, delay);
    });
  } else {
    try {
      const res = await axios.get(currentWeaherEndpointurl);
      return res.data;
    } catch (err) {
      if (err?.response.status != 200) {
        console.log(
          `Server responded with status code: ${err?.response.status}`
        );
      } else {
        console.error(err);
        throw err;
      }
    }
  }
}

export async function getWetaherHistory({
  useDummyData = false,
  delay = 0,
  apiKey = "",
  units = "metric",
  location = "haifa",
}) {
  const weatherHistoryEndpointurl = `REPLACE ME WITH CORRECT URL`;
  if (useDummyData) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(weatherHistoryDummyData);
      }, delay);
    });
  } else {
    try {
      const res = await axios.get(weatherHistoryEndpointurl);
      return res.data;
    } catch (err) {
      if (err?.response.status != 200) {
        console.log(
          `Server responded with status code: ${err?.response.status}`
        );
      } else {
        console.error(err);
        throw err;
      }
    }
  }
}

export async function getIrradiationForecast(
  useDummyData = false,
  delay = 0,
  apiKey = ""
) {
  const irradiationForecastEndpointurl = `REPLACE ME WITH CORRECT URL`;
  if (useDummyData) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(irradiationForecastDummyData);
      }, delay);
    });
  }
  try {
    const res = await axios.get(irradiationForecastEndpointurl);
    return res.data;
  } catch (err) {
    if (err?.response.status != 200) {
      console.log(`Server responded with status code: ${err?.response.status}`);
    } else {
      console.error(err);
      throw err;
    }
  }
}
