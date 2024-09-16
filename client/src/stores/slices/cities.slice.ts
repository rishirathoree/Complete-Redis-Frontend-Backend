import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

const initialState = {
    cities: { pending: false, error: null, data: [] },
};

export const GetCities = createAsyncThunk("getCities",async(queries) => {
    try {
        const response = await Api.get("/cities", queries);
        return response.statusCode === 200? { data: response.data } : { error: response.data };
    } catch (error) {
        return { error: error.response.data };
    }
})

const CitiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        // add any
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetCities.pending, (state, action) => {
            state.cities.pending = true;
        })
        .addCase(GetCities.fulfilled, (state, action) => {
            state.cities.pending = false;
            state.cities.data = action.payload.data.cities;
        })
        .addCase(GetCities.rejected, (state, action) => {
            state.cities.pending = false;
            state.cities.error = action.payload;
        })
    },
})



export const { } = CitiesSlice.actions;
export default CitiesSlice.reducer;