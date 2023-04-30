import React from 'react';
import {Container, Input, Button, Exit} from '../UI/UIPackage';
import {useNavigate} from "react-router-dom";



function Register(props) {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/userdetail');
    };

    return (
        <Container>
            <h1>계정을 등록하세요</h1>
            <Input type="name" placeholder='이름'/>
            <div className="emailContainer"
                 style={{
                     display:'flex',
                     flexDirection:'row',
                     alignItems:'center',
                     justifyContent:'center',
                 }}
            >
                <Input style={{width:'80%', marginRight:'10px'}}  type="email" placeholder='Email'/>
                <Button style={{width:'25%'}}>확인</Button>
            </div>

            <div className="verifyContainer"
                 style={{
                     display:'flex',
                     flexDirection:'row',
                     alignItems:'center',
                     justifyContent:'center',

            }}>
                <Input style={{width:'50%', marginRight:'10px'}}  type="text" placeholder='인증번호'/>
                <Button style={{width:'25%', backgroundColor:'rgb(163,183,233)'}}>확인</Button>
            </div>

            <Input type="password" placeholder="비밀번호"/>
            <Input type="password" placeholder="비밀번호 확인"/>
            <Button onClick={handleButtonClick}>
                회원가입
            </Button>

        </Container>
    );
}

export default Register;