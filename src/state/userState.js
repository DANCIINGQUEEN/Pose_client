import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    name: null,
    token: null,
    age: null,
    sex: null,
    weight: null,
    height: null,
    exercise: null,
    wishList: null,
    followers:null,
    following:null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.token = actions.payload.token
            console.log('login success!')
        },
        logout: (state, actions) => {
            state.token = null
            state.name = null
            state.email = null
            state.age = null
            state.sex = null
            state.exercise = null
            state.wishList = null
            state.weight = null
            state.height = null
            console.log('logout success!')

        },
        getUser: (state, actions) => {
            state.email = actions.payload.email
            state.name = actions.payload.name
        },
        fetchName: (state, action) => {
            state.name = action.payload.name
        },
        getUserFullInfo: (state, actions) => {
            state.email = actions.payload.email
            state.name = actions.payload.name
            state.age = actions.payload.age
            state.sex = actions.payload.sex
            state.exercise = actions.payload.exercise
            state.wishList = actions.payload.wishList
            state.weight = actions.payload.weight
            state.height = actions.payload.height
            state.followers = actions.payload.followers
            state.following = actions.payload.following
        }
    }
})

export const {
    login,
    logout,
    getUser,
    fetchName,
    getUserFullInfo
} = authSlice.actions
export default authSlice.reducer