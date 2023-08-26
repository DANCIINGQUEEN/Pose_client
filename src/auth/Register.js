import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {SEND_VERIFY_CODE, VERIFY_CODE, USER_DETAIL, REGISTER_SIMPLE_USER} from '../api'


import {ThemeColor, Container, Input, Button, Loading} from '../UI/UIPackage';
import styled from "styled-components";
import confetti from "canvas-confetti";
import {functions} from "../UI/Functions";


const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;

  .verifyContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .email {
      width: 80%;
      margin-right: 10px;
    }

    .sendCode {
      width: 25%;
    }

    .verifyCode {
      width: 50%;
      margin-right: 10px;
    }

    .sendVerifyCode {
      width: 25%;
      background-color: ${ThemeColor.disabledButtonColor};
    }

  }

  .availableEmailMsg {
    font-weight: bold;
    //color: blue;
    margin: -5px 0 5px 0;
  }

  .isPasswordCorrect {
    font-weight: bold;
    margin: -5px 0 5px 0;

  }

  .options {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .option {
    width: 330px;
    display: flex;
    justify-content: space-evenly;

    Button {
      width: 150px;
    }
  }

  a {
    text-decoration: none;
  }
`

function Register(props) {
    const [message, setMessage] = useState('');

    const [isVerifyCodeLoading, setIsVerifyCodeLoading] = useState(false)
    const [verificationCode, setVerificationCode] = useState("");

    const [isVerified, setIsVerified] = useState(false);
    const [verifiedMsg, setVerifiedMsg] = useState(<></>);

    const [isSignUpButtonClicked, setIsSignUpButtonClicked] = useState(false);
    const [isSignUpLoading, setIsSignUpLoading] = useState(false);

    const navigate = useNavigate();

    const [form, setForm] = useState({name: "", email: "", password: ""});

    const handleFormChange = e => setForm({...form, [e.target.name]: e.target.value})
    const handleVerificationCodeChange = e => setVerificationCode(e.target.value);
    const handleConfirmPasswordChange = e => setMessage(e.target.value === form.password ? '비밀번호 일치' : '비밀번호 불일치')


    const handleSendVerifyCode = async (e) => {
        e.preventDefault();
        setIsVerifyCodeLoading(true)
        await axios.post(SEND_VERIFY_CODE, {email: form.email})
            .then(res=>alert(res.data.state?'인증번호가 전송되었습니다. 이메일을 확인해주세요.':'이미 가입된 이메일입니다.'))
            .catch(err=>alert("이메일 형식이 올바르지 않습니다."))
            .finally(()=>setIsVerifyCodeLoading(false))
    }

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(VERIFY_CODE, {email: form.email, verificationCode});
            setIsVerified(true);
            const state = res.data.state
            const style = {color: state ? 'blue' : 'red'}
            setVerifiedMsg(<span className={'availableEmailMsg'} style={style}>{state ? '인증 성공' : '인증 실패'}</span>)
        } catch (error) {
            setIsVerified(false);
        }
    }

    const handleSendSubmit = () => navigate(USER_DETAIL, {state: form})


    const handleSignUpButtonClick = async () => {
        setIsSignUpLoading(true)
        try {
            await axios.post(REGISTER_SIMPLE_USER, form)
            functions.particle()
            alert('회원가입이 완료되었습니다')
            navigate('/')
        } catch (e) {
            alert('회원가입에 실패하였습니다')
        } finally {
            setIsSignUpLoading(false)
        }

    }

    return (
        <Container>
            <h1>계정을 등록하세요</h1>
            <LoginForm onSubmit={handleSendSubmit}>
                <Input name={'name'} type="name" placeholder='이름' onChange={handleFormChange}/>

                <div className="verifyContainer">
                    <Input name={'email'} className={'email'} type="email" placeholder='Email'
                           onChange={handleFormChange}/>
                    <Button className={'sendCode'} onClick={handleSendVerifyCode}>
                        {isVerifyCodeLoading ? <Loading/> : '확인'}
                    </Button>
                </div>

                <div className="verifyContainer">
                    <Input className={'verifyCode'} type="text" placeholder='인증번호'
                           onChange={handleVerificationCodeChange}/>
                    <Button className={'sendVerifyCode'} onClick={handleVerifyCode}>확인</Button>
                </div>

                {isVerified && verifiedMsg}

                <Input name={'password'} type="password" placeholder="비밀번호" onChange={handleFormChange}/>
                <Input type="Password" placeholder="비밀번호 확인" onChange={handleConfirmPasswordChange}/>

                <span className={'isPasswordCorrect'}
                      style={{color: message === '비밀번호 일치' ? 'blue' : 'red'}}>{message}</span>

                <Button type={'button'} onClick={() => setIsSignUpButtonClicked(true)}
                        style={{display: isSignUpButtonClicked ? 'none' : 'block'}}>
                    회원가입
                </Button>

                {isSignUpButtonClicked && (
                    <div className={'options'}>
                        <p>세부 정보를 등록하고 싶으신가요?</p>
                        <div className={'option'}>
                            <Button type='button' onClick={handleSignUpButtonClick}>
                                {isSignUpLoading ? <Loading/> : '나중에 함'}
                            </Button>
                            <Button type='submit'>세부 정보 입력</Button>
                        </div>
                    </div>
                )}
                <h5>계정이 있으신가요?&nbsp;&nbsp;<Link to='/'>로그인</Link></h5>
            </LoginForm>
        </Container>
    );
}

export default Register;
