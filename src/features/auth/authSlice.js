import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../environment/api';  // Your Axios instance

// Load token from localStorage if it exists
const storedToken = localStorage.getItem('token') || null;
const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

// Async thunk for signup
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
            await api.post('/auth/signup', userData);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Signup failed');
        }
    }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', userData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedUser,
        token: storedToken,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');  // Remove token from localStorage
            localStorage.removeItem('user');   // Remove user from localStorage
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);  // Persist token in localStorage
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));  // Persist user in localStorage
        },
    },
    extraReducers: (builder) => {
        // Signup
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signupUser.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);  // Store token in localStorage
            localStorage.setItem('user', JSON.stringify(action.payload.user));  // Store user in localStorage
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
