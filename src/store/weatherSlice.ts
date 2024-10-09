import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface WeatherData {
    [key: number]: {
        dt_txt: string,
        main: {
            temp: string
        },
        weather: {
            main: string
        }[]
    }[]
}

export interface WeatherState {
    isCelsiusIndicator: boolean,
    weatherData: WeatherData,
    selectedDay: number,
    city: string
}

const initialState: WeatherState = {
    isCelsiusIndicator: true,
    weatherData: {},
    selectedDay: new Date().getDate(),
    city: "Yerevan"
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        switchIndicator: (state) => {
            state.isCelsiusIndicator = !state.isCelsiusIndicator
        },
        setWeatherData: (state, action: PayloadAction<WeatherData>) => {
            state.weatherData = action.payload
        },
        setSelectedDay: (state, action: PayloadAction<number>) => {
            state.selectedDay = action.payload
        },
        setCityName: (state, action: PayloadAction<string>) => {
            state.city = action.payload
        },
    },
})

export const { switchIndicator, setWeatherData, setSelectedDay, setCityName } = weatherSlice.actions

export default weatherSlice.reducer