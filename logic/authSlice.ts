import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';


const slice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        email: null,
        name: null,
        isVerified: null,
        token: null,
    } as {
        id: number | null;
        email: string | null;
        name: string | null;
        isVerified: boolean | null;
        token: string | null;
    },
    reducers: {
        setCredentials: (
            state,
            { payload: { id, email, name, isVerified, accessToken } }:
                PayloadAction<{ id: number; email: string; name: string | null; isVerified: boolean; accessToken?: string }>,
        ) => {
            state.id = id;
            state.email = email;
            state.name = name;
            state.isVerified = isVerified;
            state.token = accessToken;
        },
        logout: (state) => {
            state.id = null;
            state.email = null;
            state.name = null;
            state.isVerified = false;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
    },
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;

export const selectUserExists = (state: RootState) => state.auth.email !== null && state.auth.token !== null;
