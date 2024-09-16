import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios.lib";

const initialState = {
    login: {
        pending: false,
        data: localStorage.getItem("confidentials")
            ? JSON.parse(localStorage.getItem("confidentials"))
            : null,
        error: null,
    },
    logout: { pending: false, success: false, error: null, },
};

export const CreateLogin = createAsyncThunk("createLogin",async(data)=>{
    try {
        const response = await Api.post("/owners/in", data)
        return response.statusCode === 200? { data: response.data } : { error: response.data }
    } catch (error) {
        return { error: error.response.data }
    }
})

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.login.pending = false;
            state.login.data = null;
            state.login.error = null;
            localStorage.clear()
        },
    },
    extraReducers: (builder) => {
        builder
           .addCase(CreateLogin.pending, (state) => {
                state.login.pending = true;
            })
           .addCase(CreateLogin.fulfilled, (state, action) => {
                state.login.pending = false;
                const { admin,accessToken, refreshToken } = action.payload.data
                localStorage.setItem("confidentials", JSON.stringify(admin));
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                state.login.data = action.payload.data.admin;
            })
           .addCase(CreateLogin.rejected, (state, action) => {
                state.login.pending = false;
                state.login.error = action.error.message;
            })
        }
})

export const { resetAuth } = AuthSlice.actions;
export default AuthSlice.reducer;