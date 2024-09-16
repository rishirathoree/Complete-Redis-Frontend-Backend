import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

const initialState = {
    pets: { pending: false, error: null, data: [] }
}

export const GetPets = createAsyncThunk("getPets", async (queries) => {
    try {
        const response = await Api.get("/pets", queries)
        return response.statusCode === 200 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data }
    }
})

const PetSlice = createSlice({
    name: "pet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetPets.pending, (state) => {
                state.pets.pending = true
            })
            .addCase(GetPets.fulfilled, (state, action) => {
                state.pets.pending = false
                state.pets.data = action.payload.data.pets
            })
            .addCase(GetPets.rejected, (state, action) => {
                state.pets.pending = false
                state.pets.error = action.payload
            })
    }
})

export default PetSlice.reducer