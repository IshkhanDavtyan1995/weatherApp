import { FunctionComponent } from "react";
import "./WeatherIndicatorSwitcher.scss"
import { useDispatch, useSelector } from "react-redux";
import { switchIndicator } from "../../../store/weatherSlice";
import { RootState } from "../../../store/store";

interface WeatherIndicatorSwitcherProps {

}

const WeatherIndicatorSwitcher: FunctionComponent<WeatherIndicatorSwitcherProps> = () => {
    const isCelsiusSelected = useSelector((state: RootState) => state.weather.isCelsiusIndicator)
    const dispatch = useDispatch()
    const handleChange = () => {
        dispatch(switchIndicator())
    }
    return (
        <div className="weatherIndicatorWrapper">
            <div>
                <input type="radio" id="celsius" name="indicator" value="celsius" onChange={handleChange} defaultChecked={isCelsiusSelected} />
                <label htmlFor="celsius">C</label>
            </div>
            <div>
                <input type="radio" id="fahrenheit" name="indicator" value="fahrenheit" onChange={handleChange} defaultChecked={!isCelsiusSelected} />
                <label htmlFor="fahrenheit">F</label>
            </div>
        </div>
    );
}

export default WeatherIndicatorSwitcher;