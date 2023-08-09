import React, {useRef, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
//회원가입
import Register from "./auth/Register";
import UserDetail from "./auth/UserDetail";
import UserDetail2 from "./auth/UserDetail2";
import UserDetail3 from "./auth/UserDetail3";
//홈
import AuthHome from "./auth/AuthHome";
import Account from "./account/Account";

//실험
import InputToss from "./prtc/InputToss";
import InputToss2 from "./prtc/InputToss2";

//네비게이션
import Exercise from "./exercise/Exercise";
import Ranking from "./ranking/Ranking";
import Training from "./exercise/Training";
import UserSetting from "./account/UserSetting";
import Mate from "./mate/Mate";

//현재 운동
import WishExercise from "./home/widget/currentExercise/WishExercise";
import GoalSetting from "./home/widget/currentExercise/GoalSetting";
import Current from "./home/widget/currentExercise/Current";
import SelectedExercise from "./exercise/SelectedExercise";

import {
    ACCOUNT,
    SELECTED_EXERCISE,
    RANKING,
    MATE,
    RECOMMEND_USER,
    UPLOAD_POST,
    USER_SETTING,
    EXERCISE,
    TRAINING,
    WISH_EXERCISE,
    GOAL,
    CURRENT,
    NEW_USER,
    USER_DETAIL,
    USER_DETAIL_2,
    USER_DETAIL_3
} from './api'
import RecommendUser from "./mate/RecommendUser";
import PostUpload from "./mate/PostUpload";
const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthHome/>}/>
                    //네비게이션바
                    <Route path={ACCOUNT} element={<Account/>}/>
                    <Route path={SELECTED_EXERCISE} element={<SelectedExercise/>}/>
                    <Route path={RANKING} element={<Ranking/>}/>
                    <Route path={MATE} element={<Mate/>}/>

                    //유저 세팅
                    <Route path={USER_SETTING} element={<UserSetting/>}/>

                    //운동
                    <Route path={EXERCISE} element={<Exercise/>}/>
                    <Route path={TRAINING} element={<Training/>}/>

                    //메이트
                    <Route path={MATE} element={<Mate/>}/>
                    <Route path={RECOMMEND_USER} element={<RecommendUser/>}/>
                    <Route path={UPLOAD_POST} element={<PostUpload/>}/>


                    //현재 유저 운동 상태
                    <Route path={WISH_EXERCISE} element={<WishExercise/>}/>
                    <Route path={GOAL} element={<GoalSetting/>}/>
                    <Route path={CURRENT} element={<Current/>}/>

                    //회원가입
                    <Route path={NEW_USER} element={<Register/>}/>
                    <Route path={USER_DETAIL} element={<UserDetail/>}/>
                    <Route path={USER_DETAIL_2} element={<UserDetail2/>}/>
                    <Route path={USER_DETAIL_3} element={<UserDetail3/>}/>
                    <Route path="/input" element={<InputToss/>}/>
                    <Route path="/input2" element={<InputToss2/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
};

export default App;
