import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

const initialState = {
    brands: { pending: false, error: null, data: [] },
}

export const GetBrands = createAsyncThunk("getBrands", async (queries) => {
    try {
        const response = await Api.get("/brands", queries)
        return response.statusCode === 200 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data };
    }
})

const BrandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        // added
    },
    extraReducers: (builder) => { 
        builder
            .addCase(GetBrands.pending, (state) => {
                state.brands.pending = true
            })
            .addCase(GetBrands.fulfilled, (state, action) => {
                state.brands.pending = false
                state.brands.data = action.payload.data.brands
            })
            .addCase(GetBrands.rejected, (state, action) => {
                state.brands.pending = false
                state.brands.error = action.payload.error
            })
     },
})


export const { } = BrandSlice.actions;
export default BrandSlice.reducer;