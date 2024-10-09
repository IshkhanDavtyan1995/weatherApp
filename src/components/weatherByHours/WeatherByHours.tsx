import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getCorrectFormatDate } from "../../utils";
import "./WeatherByHours.scss"

interface WeatherByHoursProps {

}

const WeatherByHours: FunctionComponent<WeatherByHoursProps> = () => {
    const weatherData = useSelector((state: RootState) => state.weather.weatherData)
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay)
    const isCelsiusIndicator = useSelector((state: RootState) => state.weather.isCelsiusIndicator)

    if (!weatherData?.[selectedDay]) {
        return <p>...loading</p>
    }
    return (
        <div className="weatherByHours">
            {
                weatherData[selectedDay].map((data) => {
                    return (
                        <div className="weatherDataForHour">
                            <div>
                                <p>{`${getCorrectFormatDate(data.dt_txt)} ${parseInt(data.main.temp)} ${isCelsiusIndicator ? "C" : "F"} ${data.weather[0].main}`}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default WeatherByHours;