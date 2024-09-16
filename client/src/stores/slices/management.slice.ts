import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

const initialState = {
    managements: { pending: false, data: [], error: null },
    create: { pending: false, success: false, error: null }
}

export const GetManagement = createAsyncThunk("getManagements", async (queries) => {
    try {
        const response = await Api.get("/owners", queries)
        return response.statusCode === 200 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data }
    }
})

export const CreateManagement = createAsyncThunk("createManagement", async (data) => {
    try {
        const response = await Api.post("/owners", data)
        console.log(response)
        return response.statusCode === 201 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data }
    }
})

const ManagementSlice = createSlice({
    name: "management",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetManagement.pending, (state) => {
                state.managements.pending = true
            })
            .addCase(GetManagement.fulfilled, (state, action) => {
                state.managements.pending = false
                console.log(action.payload.data)
                state.managements.data = action.payload.data.admin
            })
            .addCase(GetManagement.rejected, (state, action) => {
                state.managements.pending = false
                state.managements.error = action.payload
            })

            // create
            .addCase(CreateManagement.pending, (state) => {
                state.create.pending = true
            })
           .addCase(CreateManagement.fulfilled, (state, action) => {
            state.create.pending = false
            console.log(action.payload)
            const datas = action.payload.data.admin
            state.managements.data.push(datas)
                state.create.success = true
           })
           .addCase(CreateManagement.rejected, (state, action) => {
                console.log(error)
           })
    },
})

export const { } = ManagementSlice.actions;
export default ManagementSlice.reducer;