import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

const initialState = {
    breeds: { pending: false, error: null, data: [] },
}

export const GetBreeds = createAsyncThunk("getbreeds", async (queries) => {
    try {
        const response = await Api.get("/breeds", queries)
        return response.statusCode === 200 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data };
    }
})

const BreedsSlice = createSlice({
    name: "breeds",
    initialState,
    reducers: {
        // added
    },
    extraReducers: (builder) => { 
        builder
            .addCase(GetBreeds.pending, (state) => {
                state.breeds.pending = true
            })
            .addCase(GetBreeds.fulfilled, (state, action) => {
                state.breeds.pending = false
                state.breeds.data = action.payload.data.breeds
            })
            .addCase(GetBreeds.rejected, (state, action) => {
                state.breeds.pending = false
                state.breeds.error = action.payload.error
            })
     },
})


export const { } = BreedsSlice.actions;
export default BreedsSlice.reducer;