import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';



export const loginUser=createAsyncThunk('auth/loginUser',async(data, thunkAPI)=>{
     try {
       const response=await axios('https://stage.api.sloovi.com/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data:JSON.stringify({
                email:data.email,
                password:data.password
            }),
        })
        return response.data;
     } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
     }
})



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        message:null,
        user_id: null,
        token: null,
        error: null,
        loading: false
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.message=action.payload.message;
            state.user_id = action.payload.results.user_id;
            state.token = action.payload.results.token;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})



export const {logout} = authSlice.actions;

export default authSlice.reducer;

