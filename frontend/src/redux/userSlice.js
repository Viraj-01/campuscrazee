// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        loginUser(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setUser(state, action) {
            const { user, token } = action.payload;
            state.user = user || null;
            state.token = token || null;
        },
        clearUser(state) {
            state.user = null;
            state.token = null;
        },
    },
});

// Safe load function
export const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser) {
        try {
            return {
                user: JSON.parse(storedUser),
                token: storedToken || null,
            };
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            return { user: null, token: null };
        }
    }
    return { user: null, token: null };
};

export const { loginUser, setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;


