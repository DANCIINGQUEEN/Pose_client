import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {SEND_VERIFY_CODE, VERIFY_CODE, USER_DETAIL,REGISTER_SIMPLE_USER} from '../api'


import {ThemeColor, Container, Input, Button, Loading} from '../UI/UIPackage';
import styled from "styled-components";
import confetti from "canvas-confetti";


const LoginForm = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;`

function Register(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState('');
    const [isVerifyCodeLoading, setIsVerifyCodeLoading] = useState(false)
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isSignUpButtonClicked, setIsSignUpButtonClicked] = useState(false);
    const [isSignUpLoading, setIsSignUpLoading] = useState(false);
    const navigate = useNavigate();


    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value === password) {
            setMessage('비밀번호 일치');
        } else {
            setMessage('비밀번호 불일치');
        }
    }

    const handleSendVerifyCode = async (event) => {
        event.preventDefault();
        setIsVerifyCodeLoading(true)
        try {
            await axios.post(SEND_VERIFY_CODE, {email});
            alert("인증번호가 전송되었습니다. 이메일을 확인해주세요.");
        } catch (error) {
            alert("이메일 형식이 올바르지 않습니다.");
        } finally {
            setIsVerifyCodeLoading(false)
        }
    }

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(VERIFY_CODE, {email, verificationCode});
            if (response.data === "Verification successful") {
                setIsVerified(true);
                alert("인증번호가 일치합니다.");
            } else {
                alert("인증번호 형식이 올바르지 않습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            alert("이메일 인증 도중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    }

    const handleSendSubmit = () => {
        navigate(USER_DETAIL, {state: {name: name, email: email, password: password}})
    }
    function particle() {   //폭죽
        confetti({
            particleCount: 50,
            spread: 50
        });
    }
    const handleSignUpButtonClick =async () => {
        try{
            setIsSignUpLoading(true)
            let formData = {
                name: name,
                email: email,
                password: password,
            }
            await axios.post(REGISTER_SIMPLE_USER, formData)
            particle()
            alert('회원가입이 완료되었습니다')
            navigate('/')

        }catch (e) {
            alert('회원가입에 실패하였습니다')
        }finally {
            setIsSignUpLoading(false)
        }

    }

    return (
        <Container>
            <h1>계정을 등록하세요</h1>
            <LoginForm>
                <form onSubmit={handleSendSubmit}>
                    <Input type="name" placeholder='이름' value={name} onChange={handleNameChange}/>
                    <div className="emailContainer" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Input style={{width: '80%', marginRight: '10px'}} type="email" placeholder='Email'
                               value={email}
                               onChange={handleEmailChange}/>
                        <Button style={{width: '25%'}} onClick={handleSendVerifyCode}>
                            {isVerifyCodeLoading ? <Loading/> : '확인'}
                        </Button>
                    </div>

                    <div className="verifyContainer"
                         style={{
                             display: 'flex',
                             flexDirection: 'row',
                             alignItems: 'center',
                             justifyContent: 'center',

                         }}>
                        <Input style={{width: '50%', marginRight: '10px'}} type="text" placeholder='인증번호'
                               value={verificationCode} onChange={handleVerificationCodeChange}/>
                        <Button style={{width: '25%', backgroundColor: `${ThemeColor.disabledButtonColor}`}}
                                onClick={handleVerifyCode}>확인</Button>
                    </div>
                    {isVerified && (
                        <span
                            style={{display: 'flex', justifyContent: 'center', color: 'blue', margin: '-5px 0 -1px 0'}}>available email!</span>
                    )}
                    <Input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange}/>
                    <Input type="password" placeholder="비밀번호 확인" value={confirmPassword}
                           onChange={handleConfirmPasswordChange}/>
                    <span style={{
                        color: message === 'Passwords match' ? 'green' : 'red',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>{message}</span>
                    {/*<Button type='submit'>*/}
                    {/*    회원가입*/}
                    {/*</Button>*/}
                    <Button type={'button'} onClick={()=>setIsSignUpButtonClicked(true)} style={{display:isSignUpButtonClicked?'none':'block'}}>회원가입</Button>
                    {isSignUpButtonClicked && (
                        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center',justifyContent: 'center'}}>
                            <p>세부 정보를 등록하고 싶으신가요?</p>
                            <div style={{width:'330px',display:'flex',justifyContent:'space-evenly'}}>
                                <Button style={{width: '150px'}} type='button' onClick={handleSignUpButtonClick}>{
                                    isSignUpLoading ? <Loading/> : '나중에 함'
                                }</Button>
                                <Button style={{width: '150px'}} type='submit'>세부 정보 입력</Button>
                            </div>
                        </div>
                    )}
                </form>
            </LoginForm>
            <h5>계정이 있으신가요?&nbsp;&nbsp;<Link to='/' style={{textDecoration: 'none'}}>로그인</Link></h5>
        </Container>
    );
}

export default Register;
