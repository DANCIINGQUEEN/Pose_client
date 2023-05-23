import React from 'react';
import {Link, useNavigate} from "react-router-dom";

import {Container, NavigationBar, ThemeColor} from "../UI/UIPackage";
import styled from "styled-components";
import Slider from "react-slick";


const Box = styled.div`
  background-color: ${ThemeColor.containerColor};
  border-radius: 16px 0 0 16px;
  margin: 0 0 30px 10px;
  width: 380px;
`
const Carousel = ({componentToRender, data}) => {
    const settings = {
        arrows: false,
        dots: true,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2.8,
        onSwipe: null,
    };

    return (
        <div style={{maxWidth: "380px", margin: '0 0 0 10px'}}>
            <Slider {...settings} >
                {data && data.map((item, index) => (
                    <div key={index}>
                        {React.cloneElement(componentToRender, {text:item})}
                    </div>
                ))}
            </Slider>
        </div>
    );
}
const RecBox = ({componentToRender, text}) => {
    const navigate = useNavigate();
    const handleButtonClick=()=>{
        navigate('/training', {
            state: {exercise: text}
        })
    }
    return (

            <button onClick={handleButtonClick}
                style={{
                    width: "123px",
                    height: "161px",
                    backgroundColor: `${ThemeColor.importantColor}`,
                    margin: "10px",
                    marginLeft: '20px',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    borderRadius: '16px',
                    // userSelect:'none'
                }}
            >
                {text}
            </button>

    );
};

function Exercise(props) {
    const exercises={
        "lowerBodyExercises": [
            "스쿼트",
            "런지",
            "데드리프트",
            "레그 프레스",
            "불가리안 스플릿 스쿼트",
            "스텝 업",
            "힙 스러스트",
            "글루트 브릿지",
            "해머스트링 컬"
        ],
        "abdominalExercises": [
            "플랭크",
            "크런치",
            "러시안 트위스트",
            "마운틴 클라이머",
            "바이시클 크런치",
            "레그 레이즈",
            "플러터 킥",
            "우드초퍼",
            "리버스 크런치",
            "행잉 니 레이즈"
        ],
        "armExercises": [
            "바이셉 컬",
            "트라이셉 딥스",
            "푸시업",
            "숄더 프레스",
            "덤벨 로우",
            "트라이셉 익스텐션",
            "해머 컬",
            "사이드 레이즈",
            "스컬 크러셔",
            "천장 니 풀업"
        ]
    }
    return (
        <Container>
            <h1>운동</h1>
            <Box>
                <h3 style={{marginLeft: '20px'}}>하체 운동</h3>
                <Carousel componentToRender={<RecBox/>} data={exercises.lowerBodyExercises}/>
            </Box>
            <Box>
                <h3 style={{marginLeft: '20px'}}>복근 운동</h3>
                <Carousel componentToRender={<RecBox/>} data={exercises.abdominalExercises}/>
            </Box>
            <Box>
                <h3 style={{marginLeft: '20px'}}>팔 운동</h3>
                <Carousel componentToRender={<RecBox/>} data={exercises.armExercises}/>
            </Box>

            <NavigationBar/>

        </Container>
    );
}

export default Exercise;
