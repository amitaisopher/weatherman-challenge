import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm } from 'react-icons/io'
import { BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsCloudHaze2Fill } from 'react-icons/bs'
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from 'react-icons/tb';
import PropTypes from 'prop-types'

function WeatherCard({ mainWeather, city, country, temp, date, units = 'metric', description, visibility, feelsLike, humidity, windSpeed }) {
    let icon;
    switch (mainWeather) {
        case 'Clouds':
            icon = <IoMdCloudy />
            break
        case 'Rain':
            icon = <IoMdRainy />
            break
        case 'Haze':
            icon = <BsCloudHaze2Fill />
            break
        case 'Drizzle':
            icon = <BsCloudDrizzleFill />
            break
        case 'Clear':
            icon = <IoMdSunny />
            break
        case 'Snow':
            icon = <IoMdSnow />
            break
        case 'Thunderstorm':
            icon = <IoMdThunderstorm />
            break
    }
    return (
        <div className="w-full mx-auto max-w-[450px] bg-black/20 min-h-[568px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
            {/* card top */}
            <div className="flex items-center gap-x-5">
                {/* Icon */}
                <div className="text-[87px]">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold text-2xl">
                        {city}, {country}
                    </div>
                    {/* Date */}
                    <div>
                        {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                    </div>

                </div>
            </div>
            {/* card body */}
            <div className="my-20 ">
                <div className="flex justify-center">
                    {/* temp */}
                    <div className="text-[144px] leading-none font-light">
                        {parseInt(temp)}
                    </div>
                    <div className="text-4xl">
                        {units === 'metric' ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit />}
                    </div>
                </div>
                {/* weather description */}
                <div className="capitalize text-center">
                    {description}
                </div>
            </div>
            {/* card bottom */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="text-[20px]">
                            {/* Icon */}
                            <BsEye />
                        </div>
                        <div>
                            Visibility <span className="ml-2">{visibility ? `${visibility / 1000} km` : 'N/A'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="text-[20px]">
                            {/* Icon */}
                            <BsThermometer />
                        </div>
                        <div className="flex">
                            Feels like <div className="flex ml-2">{parseInt(feelsLike)} {units === 'metric' ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit />} </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="text-[20px]">
                            {/* Icon */}
                            <BsWater />
                        </div>
                        <div>
                            Humidity <span className="ml-2">{humidity} %</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="text-[20px]">
                            {/* Icon */}
                            <BsWind />
                        </div>
                        <div className="flex">
                            Wind <div className="flex ml-2">{`${parseInt(windSpeed)} m/s`}  </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

WeatherCard.propTypes = {
    date: PropTypes.date,
    mainWeather: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    temp: PropTypes.number,
    units: PropTypes.string,
    description: PropTypes.string,
    visibility: PropTypes.number,
    feelsLike: PropTypes.number,
    humidity: PropTypes.number,
    windSpeed: PropTypes.number
}

export default WeatherCard