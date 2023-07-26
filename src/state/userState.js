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
    followers: null,
    following: null,
    dDay: null,
    goals: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            console.log('login success!')
        },
        logout: (state) => {
            Object.assign(state, initialState);
            console.log('logout success!')

        },
        getUser: (state, action) => {
            const {email, name} = action.payload;
            state.email = email;
            state.name = name;
        },
        fetchName: (state, action) => {
            state.name = action.payload.name
        },
        getUserFullInfo: (state, action) => {
            const {
                email,
                name,
                age,
                sex,
                exercise,
                wishList,
                weight,
                height,
                followers,
                following,
                dDay,
                goals
            } = action.payload;
            Object.assign(state, {
                email,
                name,
                age,
                sex,
                exercise,
                wishList,
                weight,
                height,
                followers,
                following,
                dDay,
                goals
            });
        },
        putFollow: (state, action) => {
            state.following = action.payload.following
        },
        putGoals: (state, action) => {
            const {dDay, goals} = action.payload;
            state.dDay = dDay;
            state.goals = goals;
            console.log('putGoals success!')
        }
    }
})

export const {
    login,
    logout,
    getUser,
    fetchName,
    getUserFullInfo,
    putFollow,
    putGoals
} = authSlice.actions
export default authSlice.reducer