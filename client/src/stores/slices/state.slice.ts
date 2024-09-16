import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib.ts";

const initialState = {
    states : { pending:false,data:[],error:null }
}

export const GetState = createAsyncThunk("getStates", async (queries) => {
    try {
        const response = await Api.get("/states",queries)
        return response.statusCode === 200 ? {data:response.data} : {error:response.data}
    } catch (error) {
        return {error : error.response.data }
    }
})

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        // add any
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetState.pending,(state,action)=>{
            state.states.pending = true
        })
        .addCase(GetState.fulfilled,(state,action)=>{
            state.states.pending = false
            state.states.data = action.payload.data?.states
        })
        .addCase(GetState.rejected,(state,action)=>{
            state.states.pending = false
            state.states.error = action.payload
        })
    }
})

export default stateSlice.reducer