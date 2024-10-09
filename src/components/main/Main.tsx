import { FunctionComponent, useEffect, useState } from "react";
import "./Main.scss"
import SearchHeader from "../searchHeader/SearchHeader";
import WeatherToShow from "../weatherToShow/WeatherToShow";
import WeatherByHours from "../weatherByHours/WeatherByHours";
import WeatherByDays from "../weatherByDays/WeatherByDays";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setWeatherDataByCityName } from "../../utils";
import 'react-toastify/dist/ReactToastify.css';

interface MainProps {

}

const Main: FunctionComponent<MainProps> = () => {
    const isCelsiusIndicator = useSelector((state: RootState) => state.weather.isCelsiusIndicator)
    const selectedCityName = useSelector((state: RootState) => state.weather.city)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setIsLoading(true)
            await setWeatherDataByCityName(selectedCityName)
            setIsLoading(false)
        })()
    }, [isCelsiusIndicator])

    if (isLoading) {
        return <div>...Loading</div>
    }

    return (
        <div className="App">
            <div>
                <SearchHeader />
            </div>
            <div className='selectedWeatherData'>
                <div className="weatherToShowWrapper">
                    <WeatherToShow />
                </div>
                <div>
                    <WeatherByHours />
                </div>
            </div>
            <div className='weatherByDaysWrapper'>
                <WeatherByDays />
            </div>
        </div>
    )
}

export default Main;