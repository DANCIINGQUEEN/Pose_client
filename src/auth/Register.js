import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {SEND_VERIFY_CODE, VERIFY_CODE, REGISTER} from '../api'


import {ThemeColor,Container, Input, Button, Loading} from '../UI/UIPackage';


function Register(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState('');

    const [isVerifyCodeLoading, setIsVerifyCodeLoading] = useState(false)

    const [verificationCode, setVerificationCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);

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
            setMessage('Passwords match');
        } else {
            setMessage('Passwords do not match');
        }
    }

    const handleSendVerifyCode = async (event) => {
        event.preventDefault();
        setIsVerifyCodeLoading(true)
        try {
            // Send verification code to user's email
            await axios.post(SEND_VERIFY_CODE, {email});
            alert("Verification code sent to email");
        } catch (error) {
            alert("Invalid email address");
        } finally {
            setIsVerifyCodeLoading(false)
        }
    }

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        try {
            // Verify code entered by the user
            const response = await axios.post(VERIFY_CODE, {email, verificationCode});
            if (response.data === "Verification successful") {
                setIsVerified(true);
                alert("Email verified");
            } else {
                alert("Invalid verification code");
            }
        } catch (error) {
            alert("An error occurred while verifying the code");
        }
    }

    // const handleSubmit = async (e) => {
    //     try {
    //         let formData = {
    //             name: name,
    //             email: email,
    //             password: password
    //         }
    //         console.log(formData)
    //         await axios.post(REGISTER, formData)
    //         alert("Signup successful");
    //         console.log(formData)
    //     } catch (error) {
    //         alert("An error occurred while signing up");
    //     }
    // }
    const handleSendSubmit= ()=>{
        navigate('/userdetail', {state: {name: name, email: email, password: password}})
    }

    return (
        <Container>
            <h1>계정을 등록하세요</h1>
            <form onSubmit={handleSendSubmit}>

                <Input type="name" placeholder='이름' value={name} onChange={handleNameChange}/>
                <div className="emailContainer"
                     style={{
                         display: 'flex',
                         flexDirection: 'row',
                         alignItems: 'center',
                         justifyContent: 'center',
                     }}
                >
                    <Input style={{width: '80%', marginRight: '10px'}} type="email" placeholder='Email' value={email}
                           onChange={handleEmailChange}/>
                    <Button style={{width: '25%'}} onClick={handleSendVerifyCode}>확인</Button>
                    {isVerifyCodeLoading && (<Loading/>)}
                </div>
                {isVerified && (
                    <span style={{display: 'flex', justifyContent: 'center', color: 'blue'}}>available email!</span>
                )}

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

                <Input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange}/>
                <Input type="password" placeholder="비밀번호 확인" value={confirmPassword}
                       onChange={handleConfirmPasswordChange}/>
                <span style={{
                    color: message === 'Passwords match' ? 'green' : 'red',
                    display: 'flex',
                    justifyContent: 'center'
                }}>{message}</span>
                <Button type='submit'>
                    회원가입
                </Button>
            </form>
            <h5>계정이 있으신가요?&nbsp;&nbsp;<a href='/' style={{textDecoration: 'none'}}>로그인</a></h5>


        </Container>
    );
}

export default Register;
