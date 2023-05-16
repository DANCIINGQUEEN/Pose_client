import React, { useRef, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
//회원가입
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserDetail from "./auth/UserDetail";
import UserDetail2 from "./auth/UserDetail2";
import UserDetail3 from "./auth/UserDetail3";
//홈
import AuthHome from "./auth/AuthHome";
import InputToss from "./prtc/InputToss";
import InputToss2 from "./prtc/InputToss2";

const App = () => {

  return (
      <div className="App">
        {/*<h1>운동 메이트</h1>*/}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthHome/>}/>
            {/*<Route path="/login" element={<Login/>}/>*/}
            <Route path="/register" element={<Register/>}/>
            <Route path="/userdetail" element={<UserDetail/>}/>
            <Route path="/userdetail2" element={<UserDetail2/>}/>
            <Route path="/userdetail3" element={<UserDetail3/>}/>
            <Route path="/input" element={<InputToss/>}/>
            <Route path="/input2" element={<InputToss2/>}/>
          </Routes>
        </BrowserRouter>
          {/*<NavigationBar/>*/}
      </div>

  );
};

export default App;
