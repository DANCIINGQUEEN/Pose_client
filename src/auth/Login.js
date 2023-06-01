import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import axios from "axios";
import {LOGIN} from '../api'
import {login} from "../state/userState";


import {Container, Input, Button} from '../UI/UIPackage';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [isLoginErrorMessage, setIsLoginErrorMessage] = useState(false);

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const setLogin = (e) => {
        e.preventDefault();
        // console.log(email, password)
        axios.post(LOGIN, {
            email: email,
            password: password
        })
            .then(function (response) {
                //api데이터 출력
                if (response.data.token) {
                    // Save the JWT token in the session storage
                    sessionStorage.setItem('jwt', response.data.token);
                    dispatch(
                        login({
                            token: response.data.token
                        })
                    )
                    setIsLoginErrorMessage(false)

                    // history.push('/')

                    return true;
                } else {
                    return false;
                }


            })
            .catch(function (error) {
                setError('Invalid email or password');
                // console.log(error);
                setLoginErrorMessage('Invalid email or password!!')
                setIsLoginErrorMessage(true)
            });
    }
    return (
        <Container>

            {/*<h1>운동 메이트</h1>*/}

            <h1>로그인</h1>
            <div style={{display:'flex', flexDirection:'column',justifyContent:'center', width:'90%'}}>
            <form onSubmit={setLogin}>

                <Input type="email" placeholder='Email' value={email} onChange={handleEmailChange}/>
                <Input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange}/>
                <Button type='submit'>
                    로그인
                </Button>
            </form>
                {isLoginErrorMessage && <p style={{color: 'red',display:'flex',justifyContent:'center', margin:'-5px 0 -19px 0' }}>{loginErrorMessage}</p>}
            </div>
            <br/>
            <h5>계정이 없으신가요?&nbsp;&nbsp;<a href='/register' style={{textDecoration: 'none'}}>회원가입</a></h5>
        </Container>
    );
}

export default Login;