import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import axios from "axios";
import {LOGIN, NEW_USER} from '../api'
import {login} from "../state/userState";


import {Container, Input, Button, Loading} from '../UI/UIPackage';
import styled from "styled-components";

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;

  p {
    color: red;
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin: -5px 0 -19px 0;
  }

  a {
    text-decoration: none;
  }
`


function Login(props) {
    const [form, setForm] = useState({email: "", password: ""});
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleFormChange = e => setForm({...form, [e.target.type]: e.target.value})

    const errorMsg = {
        401: "이메일이 일치하지 않습니다",
        402: "비밀번호가 일치하지 않습니다",
    };
    const setLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            const response = await axios.post(LOGIN, {form});
            if (response.data.token) {
                sessionStorage.setItem('jwt', response.data.token);
                dispatch(login({token: response.data.token}));
            }
        }
        catch (error) {
            error.response&&setErrorMessage(errorMsg[error.response.status] || "An error occurred")
        }
        finally {setIsLoading(false);}
    };

    return (
        <Container>
            <h1>로그인</h1>
            <LoginForm>
                <form onSubmit={setLogin}>
                    <Input type="email" placeholder='Email' onChange={handleFormChange}/>
                    <Input type="password" placeholder="비밀번호" onChange={handleFormChange}/>
                    <Button type='submit'>
                        {isLoading ? <Loading/> : '로그인'}
                    </Button>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
                <br/>
                <h5>계정이 없으신가요?&nbsp;&nbsp;<Link to={NEW_USER}>회원가입</Link></h5>
            </LoginForm>
        </Container>
    );
}

export default Login;