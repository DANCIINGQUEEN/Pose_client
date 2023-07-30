import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    _id:null,
    email: null,
    name: null,
    token: null,
    age: null,
    area: null,
    sex: null,
    weight: null,
    height: null,
    exercise: null,
    wishList: null,
    followers: null,
    followerNames:null,
    following: null,
    followingNames:null,
    dDay: null,
    goals: null,

}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            // console.log('login success!')
        },
        logout: (state) => {
            sessionStorage.removeItem('jwt');
            Object.assign(state, initialState);
            // console.log('logout success!')

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
                _id,
                email,
                name,
                age,
                area,
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
                _id,
                email,
                name,
                age,
                area,
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
            // console.log('putGoals success!')
        },
        putAttain: (state, action) => {
            state.attain=action.payload.attain
        },
        putFollowerNames: (state, action) => {
            const {followerNames} = action.payload;
            state.followerNames = followerNames;
            // console.log('hello',followerNames,state.followerNames)
        },
        putFollowingNames: (state, action) => {
            const {followingNames} = action.payload;
            state.followingNames = followingNames;
            // console.log('putFollowingNames success!', state.followingNames)
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
    putGoals,
    putAttain,
    putFollowerNames,
    putFollowingNames
} = authSlice.actions
export default authSlice.reducer