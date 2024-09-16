import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

export const GetCountries = createAsyncThunk("getCountries", async (queries?: any) => {
    try {
        const response = await Api.get("/countries", queries)
        return response.statusCode === 200 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data }
    }
})

const initialState = {
    countries: { pending: false, error: null, data: [] },
    selected : [],
}

const CountriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        resetCountries: (state) => {
            state.selected = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetCountries.pending, (state, action) => {
                state.countries.pending = true
            })
            .addCase(GetCountries.fulfilled, (state, action) => {
                state.countries.pending = false
                state.countries.data = action.payload.data.countries
            })
            .addCase(GetCountries.rejected, (state, action) => {
                state.countries.pending = false
                state.countries.error = action.payload
            })
    }
})


export const { } = CountriesSlice.actions;
export default CountriesSlice.reducer;