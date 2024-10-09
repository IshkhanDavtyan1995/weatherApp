import { FunctionComponent, useEffect, useState } from "react";
import "./SearchHeader.scss"
import { setWeatherDataByCityName } from "../../utils";
import WeatherIndicatorSwitcher from "./components/WeatherIndicatorSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import { setCityName } from "../../store/weatherSlice";
import { ToastContainer } from "react-toastify";
import { Toast } from "react-toastify/dist/components";

interface SearchHeaderProps {

}

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
    const currentCity = useSelector((state: RootState) => state.weather.city)
    const dispatch = useDispatch()
    const [city, setCity] = useState(currentCity)

    useEffect(() => {
        (async () => {
            try {
                //if i was working with next.js i could make a request to my next.js project api and get the information but with react i need a separate api to get the city information   
                const response = await axios.get("http://ipinfo.io")
                if (response.data && response.data.city) {
                    setCity(response.data.city)
                    dispatch(setCityName(response.data.city))
                }
            } catch { }

        })()
    }, [])

    return (
        <div className="searchForm">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="searchFormWrapper">
                <div>
                    <input placeholder="city" onChange={(e) => setCity(e.target.value)} value={city} />
                </div>
                <div>
                    <button onClick={() => setWeatherDataByCityName(city)}>Submit</button>
                </div>
            </div>
            <div className="weatherIndicator">
                <WeatherIndicatorSwitcher />
            </div>
        </div>
    );
}

export default SearchHeader;