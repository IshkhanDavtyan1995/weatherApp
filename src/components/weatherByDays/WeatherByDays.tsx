import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./WeatherByDays.scss"
import { setSelectedDay } from "../../store/weatherSlice";

interface WeatherByDaysProps {

}

const WeatherByDays: FunctionComponent<WeatherByDaysProps> = () => {
    const weatherData = useSelector((state: RootState) => state.weather.weatherData)
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay)
    const dispatch = useDispatch()

    const setNewDay = (day: number) => {
        dispatch(setSelectedDay(day))
    }

    if (!Object.keys(weatherData).length) {
        return <p>...Loading</p>
    }

    return (
        <div className="weatherByDays">
            {
                Object.keys(weatherData).map((day) => {
                    return (
                        <div
                            className={`${selectedDay === parseInt(day) ? "selectedDay" : ""} weatherByDaysItem`}
                            onClick={() => setNewDay(parseInt(day))}
                        >
                            {day}-{parseInt(day) + 1}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default WeatherByDays;