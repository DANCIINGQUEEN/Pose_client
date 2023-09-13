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
    activeNav:'home',

}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        navClick: (state, action) => {
          state.activeNav = action.payload.activeNav;
        },
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
        updateAttain: (state, action) => {
            const {label, attain} = action.payload;
            const goals = state.goals.map(goal => {
                if (goal.label === label) {
                    return {
                        ...goal,
                        attain: attain.toString()
                    };
                }
                return goal;
            });

            // 새로운 goals 배열로 상태를 업데이트
            state.goals = goals;
            // console.log(state.goals)
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
        },
        follow_user: (state, action) => {
            const {userIdToFollow} = action.payload;
            const isFollowing = state.following.includes(userIdToFollow);
            if (!isFollowing) {
                state.following= [...state.following, userIdToFollow]
            }
            console.log('fo',state.following, userIdToFollow)
        },
        unfollow_user: (state, action) => {
            const unfollowUser = action.payload;
            state.following = state.following.filter((userId) => userId !== unfollowUser);
            console.log('un',state.following, unfollowUser)
        },
        updateProfile: (state, action) => {
            const {name, email}=action.payload
            state.name=name;
            state.email=email;
        },
        updateAge: (state, action) => {
            const {age}=action.payload
            state.age=age;
        },
        updateArea: (state, action) => {
            const {area}=action.payload
            state.area=area;
        },
        updateWeight: (state, action) => {
            const {weight}=action.payload
            state.weight=weight;
        },
        updateHeight: (state, action) => {
            const {height}=action.payload
            state.height=height;
        },
        updateExercise: (state, action) => {
            const {exercise}=action.payload
            state.exercise=exercise;
        },
        updateWishList: (state, action) => {
            const {wishList}=action.payload
            state.wishList=wishList;
        },
        initialGoal: (state, action) => {
            state.dDay=null;
            state.goals=null;
        }
    }
})

export const {
    navClick,
    login,
    logout,
    getUser,
    fetchName,
    getUserFullInfo,
    follow_user,
    unfollow_user,
    putFollow,
    putGoals,
    updateAttain,
    putFollowerNames,
    putFollowingNames,
    updateProfile,
    updateAge,
    updateArea,
    updateWeight,
    updateHeight,
    updateExercise,
    updateWishList,
    initialGoal
} = authSlice.actions
export default authSlice.reducer