import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedInUser: {
            userName: '',
            emailAddress: '',
            name: '',
            surname: '',
            roles: [],
            accounts: []
        }
    },
    reducers: {
        setLoggedInUser: (state, action) => {
            console.log("setLoggedInUSer", action);
            state.loggedInUser = action.payload;
        },
        addUserAccount: (state, action) => {
            state.loggedInUser.accounts.push(action.payload);
        },
        updateUserAccountBalance: (state, action) => {
            console.log("payload", action);
            var userAccount = state.loggedInUser.accounts.find(a => a.id == action.payload.id);
            userAccount.balance = action.payload.balance;
            state.loggedInUser.accounts = state.loggedInUser.accounts.filter(a => a.id != action.payload.id);
            state.loggedInUser.accounts.push(userAccount);
        },
        logout: (state) => {
            state.loggedInUser = {
                userName: '',
                emailAddress: '',
                name: '',
                surname: '',
                balance: 0,
                roles: []
            };
        }
    }
});

export const {
    setLoggedInUser,
    logout,
    addUserAccount,
    updateUserAccountBalance
} = userSlice.actions;

export default userSlice.reducer;