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
                        {React.cloneElement(componentToRender, {text: item})}
                    </div>
                ))}
            </Slider>
        </div>
    );
}
const RecBox = ({componentToRender, text}) => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
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
    //홈 트레이닝
    const exercises = {
        "lowerBodyExercises": [
            "스쿼트",
            "런지",
            "데드리프트",
        ],
        "abdominalExercises": [
            "플랭크",
            "크런치",
            "레그 레이즈",
        ],
        "armExercises": [
            "푸시업",
            "숄더 프레스",
            "덤벨 로우",
            "해머 컬",

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
