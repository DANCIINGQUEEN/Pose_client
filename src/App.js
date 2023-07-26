import React, {useRef, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
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
const App = () => {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthHome/>}/>
                    {/*네비게이션바*/}
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/exercise/selected" element={<SelectedExercise/>}/>
                    <Route path="/ranking" element={<Ranking/>}/>
                    <Route path="/mate" element={<Mate/>}/>

                    //유저 세팅
                    <Route path="/usersetting" element={<UserSetting/>}/>

                    //운동
                    <Route path="/exercise" element={<Exercise/>}/>
                    <Route path="/exercise/training" element={<Training/>}/>


                    //현재 유저 운동 상태
                    <Route path="/exercise/wishexercise" element={<WishExercise/>}/>
                    <Route path='/exercise/goal' element={<GoalSetting/>}/>
                    <Route path='/exercise/current' element={<Current/>}/>

                    //회원가입
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/userdetail" element={<UserDetail/>}/>
                    <Route path="/userdetail2" element={<UserDetail2/>}/>
                    <Route path="/userdetail3" element={<UserDetail3/>}/>
                    <Route path="/input" element={<InputToss/>}/>
                    <Route path="/input2" element={<InputToss2/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
};

export default App;
