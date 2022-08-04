import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
})

export const fetchSignup = createAsyncThunk('auth/fetchSignup', async (params) => {
    const { data } = await axios.post('/auth/signup', params)
    return data
})

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
    const { data } = await axios.get('/auth/me')
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchLogin.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },

        [fetchMe.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchMe.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchMe.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },

        [fetchSignup.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchSignup.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchSignup.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        }
    }
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
