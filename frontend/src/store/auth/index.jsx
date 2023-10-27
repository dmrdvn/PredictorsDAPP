import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentAccount: {
        id: 1,
        userName: 'test',
        fullName: 'Test User',
        wallet: '0x1234567890',
        userType: 'admin',
        avatar: '',
        registerDate: '2021-01-01',
        isVerified: true,
        followersCount: 0,
        followingCount: 0,
        bio: '',
        location: '',
        predictionCount: 0,
        succesfulPredictions: [],
        
},
accounts: []
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducer: { // manipule metodlari
        _addAccounts: (state, action) => {
            state.accounts.push(action.payload)
        },

        _removeAccount: (state, action) => {
            state.accounts = state.accounts.filter(account => account.id !== action.payload)
            if(state.currentAccount && action.payload === state.currentAccount.id) {
                this._setCurrentAccount(false)
            }
        },

        _setCurrentAccount: (state, action) => {
            state.currentAccount = action.payload
        }
    }
})

export const { _addAccounts, _removeAccount, _setCurrentAccount } = auth.actions
export default auth.reducer