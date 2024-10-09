import axios from "axios"
import { store } from "./store/store"
import { setCityName, setWeatherData } from "./store/weatherSlice"
import { toast } from "react-toastify"
const weatherApiKey = "1802db05a2f89e9d763bea81c3ed00c6"

export const getCurrentWeather = async (city: string) => {
    const isCelsiusIndicator = store.getState().weather.isCelsiusIndicator
    const wheaterData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=${isCelsiusIndicator ? "metric" : "imperial"}`)
    return wheaterData
}

export const getDataByCity = async (city: string = 'Yerevan') => {
    const isCelsiusIndicator = store.getState().weather.isCelsiusIndicator
    const wheaterData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=${isCelsiusIndicator ? "metric" : "imperial"}`)
    return wheaterData
}

export const modifyWeatherList = (weatherArr: any) => {
    const result: any = {}

    weatherArr.map((item: any) => {
        const txt = new Date(item.dt_txt)
        const day = txt.getDate()
        if (result[day]) {
            result[day] = [...result[day], { ...item }]
        } else {
            result[day] = [{ ...item }]
        }
    })

    return result

}

export const setWeatherDataByCityName = async (city: string) => {
    try {
        const dispatch = store.dispatch
        const currentData = await getDataByCity(city)
        if (currentData.data) {
            const result = modifyWeatherList(currentData.data.list)
            dispatch(setWeatherData(result))
            dispatch(setCityName(city))
        }
    } catch (e: any) {
        if (e?.status === 404) {
            toast.error("City not found")
        } else {
            toast.error("something went wrong")
        }
    }
}

export const getCorrectFormatDate = (date: string) => {
    const toDateFormat = new Date(date)
    const hours = toDateFormat.getHours()
    const minutes = toDateFormat.getMinutes()
    const seconds = toDateFormat.getSeconds()
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}