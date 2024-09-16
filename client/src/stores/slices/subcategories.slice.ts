import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

const initialState = {
    create : { pending:false,success:false,error:null },
    subcategories : { pending:false,data:[],error:null },
}

export const GetSubcategories = createAsyncThunk("getSubCategory",async(queries) =>{
    try {
        const response = await Api.get("/subcategories", queries)
        return response.statusCode === 200 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data };
    }
})

export const CreateSubCategoriesHandler = createAsyncThunk("createSub", async (form) => {
    try {
        const response = await Api.post("/subcategories", form)
        console.log(response)
        return response.statusCode === 201 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data };
    }
})

const Subcategories = createSlice({
    name:"subcategories",
    initialState,
    reducers: {
        //add reducers here
    },
    extraReducers: (builder) => {
        builder
        //add extra reducers here
        .addCase(GetSubcategories.pending,(state,action)=>{
            state.subcategories.pending = true
        })
        .addCase(GetSubcategories.fulfilled,(state,action)=>{
            state.subcategories.pending = false
            state.subcategories.data = action.payload.data.subcategories || []
        })
        .addCase(GetSubcategories.rejected,(state,action)=>{
            state.subcategories.pending = false
            state.subcategories.error = action.payload.error
        })

        .addCase(CreateSubCategoriesHandler.pending, (state, action) => {
            state.create.pending = true
        })
        
        .addCase(CreateSubCategoriesHandler.fulfilled, (state, action) => {
            state.create.pending = false
            const data = action.payload.data.subcategories
            console.log(action.payload,'payload1')
            console.log(action.payload.data.subcategories,'payload')
            // state.subcategories.data.push(data)
            state.create.success = true
            state.subcategories.data.push(data)
        })  

        .addCase(CreateSubCategoriesHandler.rejected, (state, action) => {
            console.log(error)
        })
    }
})


export const {} = Subcategories.actions
export default Subcategories.reducer