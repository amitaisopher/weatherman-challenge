# Weatherman Challenge

Weatherman Challenge is a React based app that uses a beautiful and minimalistic UI to show weather history,current weather information, and also graphical representation of daily changes of certain irradiation parameters based on forecasts.

The app can use either dummy data (already included) or an API to fetch data and it is very easy to switch between them. Below is a list of the main features implemented in the app.

<img width="1437" alt="image" src="https://github.com/amitaisopher/weatherman-challenge/assets/9464281/1ba9e867-9a1a-4c3c-890c-1426dcc1368c">



## Features

- Show historic weather data based on location
- Show current weather information based on location
- Show graphical representation of daily changes in irradiation parameters
- Auto updates the information every 30 minutes (configurable)
- Looks great overall but also on mobile devices
- Switch with ease from dummy data to fetching data from API (OpenWeather as API provider)
- Support searching by location and fetching weather information (works with current weather information - other features, i.e. weather history, irradiation data, ..., are behind paywall)

This text you see here is \*actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results on the right.

## Installation

Make you have Node JS installed on your computer (I'm using version 18.13) since we need to use `npm` or `yarn` package managers.

Clone this repository and navigate to the project folder, normally it will have the same name of the repository and the run the following commands in the terminal

Install the dependencies and devDependencies and start the server.

```sh
cd weatherman-challenge
yarn
yarn dev
```

Then open your browser and go to `http://localhost:5173`

## Switching between dummy data and live data via API

Every data type (i.e. current weather, weather history, etc) has a matching function that is responsible for fetching this information. All those function are located in a single file `src/utils/dataFetching.js`. Each function expects an object and destructure it - if it contains a field named `useDummyData` with the value of `true` then it will mimic the behavior of an API call and return dummy data from a file after a delay. The delay (in ms) is also configurable and can be included in the object passed to the function.

When switching to fetching data from API you need to generate your API key and assign it to a const variable named `apiKey` (look surprised) located in `src/App.jsx`

## License

MIT
