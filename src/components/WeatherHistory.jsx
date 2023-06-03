function WeatherHistory({ children }) {
    return (
        <div className="h-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3">
            {children}
        </div>
    )
}

export default WeatherHistory