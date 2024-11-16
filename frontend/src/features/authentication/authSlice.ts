import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState } from "../../interfaces";

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

// TODO - implement logic to check when to call the backend API to retrieve the user info again. This should only happen when the user's session expires after like 3 days.
export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
    const response = await axios.get("http://localhost:4000/api/user/current", {
        withCredentials: true
    });

    return response?.data; 
});

// Function that handles logging the user out
function logoutUser(): null {
    axios.post("http://localhost:4000/api/auth/sign-out", { }, {
        withCredentials: true
    }).then(response => {
        console.log(response.data);
    });
    return null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = logoutUser();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true; // Set loading to true while fetching
                state.error = null; // Reset error
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when fetch is complete
                state.user = action.payload; // Set user data from the action payload
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false; // Set loading to false on error
                state.error = action.error.message || "Failed to fetch user data"; // Set error message
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
