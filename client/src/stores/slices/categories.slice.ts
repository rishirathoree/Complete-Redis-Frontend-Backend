import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

const initialState = {
    categories: { pending: false, data: [], error: null },
    create: { pending: false, success:false, error: null },
}

export const GetCategories = createAsyncThunk("getcategories", async (queries) => {
    try {
        const response = await Api.get("/categories", queries)
        return response.statusCode === 200 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data };
    }
})

export const CreateCategoriesHandler = createAsyncThunk("createCategory", async (form) => {
    try {
        const response = await Api.post("/categories", form)
        return response.statusCode === 201 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data };
    }
})

const CategoriesSlice = createSlice({
    name: "CategoriesSlice",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetCategories.pending, (state) => {
                state.categories.pending = true
            })
            .addCase(GetCategories.fulfilled, (state, action) => {
                state.categories.pending = false
                state.categories.data = action.payload.data.categories
            })
            .addCase(GetCategories.rejected, (state, action) => {
                state.categories.pending = false
                state.categories.error = action.payload
            })

            // create
            .addCase(CreateCategoriesHandler.pending, (state, action) => {
                state.create.pending = true
            })
            
            .addCase(CreateCategoriesHandler.fulfilled, (state, action) => {
                state.create.pending = false
                const data = action.payload.data.categories
                console.log(data)
                state.categories.data.push(data)
                state.create.success = true
            })

            .addCase(CreateCategoriesHandler.rejected, (state, action) => {
                console.log(error)
            })
    }
})

export const { } = CategoriesSlice.actions
export default CategoriesSlice.reducer