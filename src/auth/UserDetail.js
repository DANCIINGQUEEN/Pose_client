import React, {useState} from 'react';
import {Button, Container, CustomSelect} from '../UI/UIPackage';
import {useLocation, useNavigate} from "react-router-dom";


const UserDetail = (props) => {
    const sexList = ['남자', '여자']
    const areaList = ['서울', '경기', '인천', '강원', '충북', '충남', '대전', '경북', '경남', '대구', '울산', '부산', '전북', '전남', '광주', '제주']
    const heightList = ['150 이하', 150, 160, 170, 180, 190, '190 이상']
    const weightList = ['50 이하', 50, 60, 70, 80, 90, '90 이상']
    const ageList = [10, 20, 30, 40, 50, '60 이상']

    const [sex, setSex] = useState(null);
    const [area, setArea] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [age, setAge] = useState(null);

    const location = useLocation()
    const name = location.state?.name || ''
    const email = location.state?.email || ''
    const password = location.state?.password || ''

    const handleSexChange = (selectedSex) => {
        console.log(selectedSex)
        setSex(selectedSex)
    }
    const handleAreaChange = (selectedArea) => {
        console.log(selectedArea)
        setArea(selectedArea)
    }
    const handleHeightChange = (selectedHeight) => {
        console.log(selectedHeight)
        setHeight(selectedHeight)
    }
    const handleWeightChange = (selectedWeight) => {
        console.log(selectedWeight)
        setWeight(selectedWeight)
    }
    const handleAgeChange = (selectedAge) => {
        console.log(selectedAge)
        setAge(selectedAge)
    }


    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/userdetail2', {
            state: {
                ...location.state,
                sex: sex,
                area: area,
                height: height,
                weight: weight,
                age: age
            }
        });
    };

    return (
        <Container>
            <h1>자세한 유저 정보</h1>
            <span>{name}</span>
            <span>{email}</span>
            <span>{password}</span>
            {/*<div style={{marginBottom:'100px'}}>*/}

            <CustomSelect options={sexList} item='성별' onChange={handleSexChange}/>
            {/*<p>{selectedSex?selectedSex:null}</p>*/}
            <CustomSelect options={areaList} item='지역' onChange={handleAreaChange}/>
            <CustomSelect options={heightList} item='키' onChange={handleHeightChange}/>
            <CustomSelect options={weightList} item='몸무게' onChange={handleWeightChange}/>
            <CustomSelect options={ageList} item='나이' onChange={handleAgeChange}/>
            <Button onClick={handleButtonClick}>등록</Button>
            {/*</div>*/}

        </Container>
    );
};

export default UserDetail;

