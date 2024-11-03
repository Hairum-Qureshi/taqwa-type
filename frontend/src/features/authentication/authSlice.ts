import { createSlice } from "@reduxjs/toolkit";

interface UserData {
    first_name: string;
    last_name: string;
    uid: string;
    email: string;
    pfp: string;
}

interface State {
    user: UserData | null;
}

const initialState: State = {
    user: null
};

// Function to get user info - use GET request
function getUserInfo(): UserData {
    return {
        first_name: 'John',
        last_name: 'Doe',
        uid: '12345',
        email: 'john.doe@example.com',
        pfp: 'profile.jpg'
    };
}

// Function that handles logging the user out
function logoutUser(): null {
    return null;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userData: (state) => {
            state.user = getUserInfo(); 
        },
        logout: (state) => {
            state.user = logoutUser();
        }
    }
});

export const { userData, logout } = authSlice.actions;
export default authSlice.reducer;
