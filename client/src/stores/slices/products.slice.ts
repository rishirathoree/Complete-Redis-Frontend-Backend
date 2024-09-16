import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

const initialState = {
    products : { pending:false,data:[],error:null },
    create : { pending:false,success:false,error:null },
}

export const CreateProductsHandler = createAsyncThunk("addProducts",async(data)=>{
    try {
        const response = await Api.post("/products", data)
        return response.statusCode === 201? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data }
    }
})

export const GetProducts = createAsyncThunk("getProducts", async (queries) => {
    try {
        const response = await Api.get("/products", queries)
        return response.statusCode === 200 ? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data }
    }
})

const ProductSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        resetCreate : (state) => {
            state.create.pending = false
            state.create.success = false
            state.create.error = null
        }
    },
    extraReducers:(builder) => {
        builder
       .addCase(GetProducts.pending, (state, action) => {
        state.products.pending = true
       })
       .addCase(GetProducts.fulfilled, (state, action) => {
        state.products.pending = false
        state.products.data = action.payload.data.products
       })
       .addCase(GetProducts.rejected, (state, action) => {
        state.products.pending = false
        state.products.error = action.payload
       })

       .addCase(CreateProductsHandler.pending, (state, action) => {
        state.create.pending = true
       })
       .addCase(CreateProductsHandler.fulfilled, (state, action) => {
        state.create.pending = false
        state.create.success = true
       })
       .addCase(CreateProductsHandler.rejected, (state, action) => {
        console.log(error)
       })
    }
})


export const {resetCreate} = ProductSlice.actions;
export default ProductSlice.reducer;