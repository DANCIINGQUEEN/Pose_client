import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Input, Button} from '../UI/UIPackage';

function Login(props) {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/');
    };
    return (
        <Container>

            {/*<h1>운동 메이트</h1>*/}
            <h1>로그인</h1>
            <Input type="email" placeholder='Email'/>
            <Input type="password" placeholder="비밀번호"/>
            <Button onClick={handleButtonClick}>
                로그인
            </Button>
            <br/>
            <h5>계정이 없으신가요?&nbsp;&nbsp;<a href='/register' style={{textDecoration: 'none'}}>회원가입</a></h5>
        </Container>
    );
}

export default Login;