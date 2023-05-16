import React from 'react';
import {Button, Container, CustomSelect} from '../UI/UIPackage';
import {useLocation, useNavigate} from "react-router-dom";


const UserDetail = (props) => {
    const sex=['남자','여자']
    const area=['서울', '경기', '인천', '강원', '충북', '충남', '대전', '경북', '경남', '대구', '울산', '부산', '전북', '전남', '광주', '제주']
    const height=['150 이하', 150, 160, 170, 180, 190, '190 이상']
    const weight=['50 이하', 50, 60, 70, 80, 90, '90 이상']
    const age=[10, 20, 30, 40, 50, '60 이상']

    const location=useLocation()
    const name=location.state?.name||''
    const email=location.state?.email||''
    const password=location.state?.password||''


    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/userdetail2');
    };

    return (
        <Container>
            <h1>자세한 유저 정보</h1>
            <span>{name}</span>
            <span>{email}</span>
            <span>{password}</span>
            {/*<div style={{marginBottom:'100px'}}>*/}

                <CustomSelect options={sex} item='성별'/>
                <CustomSelect options={area} item='지역'/>
                <CustomSelect options={height} item='키'/>
                <CustomSelect options={weight} item='몸무게'/>
                <CustomSelect options={age} item='나이'/>
                <Button onClick={handleButtonClick}>등록</Button>
            {/*</div>*/}

        </Container>
    );
};

export default UserDetail;

