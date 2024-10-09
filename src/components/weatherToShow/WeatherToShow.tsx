import { FunctionComponent, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getCurrentWeather } from "../../utils";

interface WeatherToShowProps {

}

const WeatherToShow: FunctionComponent<WeatherToShowProps> = () => {
    const city = useSelector(((state: RootState) => state.weather.city))
    const isCelsiusIndicator = useSelector((state: RootState) => state.weather.isCelsiusIndicator)
    const [currentWeatherData, setCurrentWeatherData] = useState<any>()

    useEffect(() => {
        (async () => {
            const currentWeatherData = await getCurrentWeather(city)
            if (currentWeatherData.data) {
                setCurrentWeatherData(currentWeatherData.data)
            }
        })()
    }, [])

    if (!currentWeatherData) {
        return <div>...Loading</div>
    }

    return (
        <div className="weatherToShow">
            <div>
                <p>{`${city.charAt(0).toUpperCase()}${city.slice(1)}`}</p>
            </div>
            <div>
                {`${parseInt(currentWeatherData.main.temp)} ${isCelsiusIndicator ? "C" : "F"}`}
            </div>
            <div>
                {currentWeatherData.weather[0].main}
            </div>
        </div>
    );
}

export default memo(WeatherToShow);