import React from 'react';
import {Link, useNavigate} from "react-router-dom";

import {Container, NavigationBar, Scroll, ThemeColor, exerciseImage, LinkBox} from "../UI/UIPackage";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {TRAINING, SELECTED_EXERCISE} from '../api'


const Box = styled.div`
  background-color: ${ThemeColor.containerColor};
  border-radius: 16px 0 0 16px;
  margin: 0 0 30px 10px;
  width: 380px;
`


const Carousel = ({data}) => {
    return (
        <Scroll>
            {Object.values(data).map((data, index) => (
                <div key={index}>
                        <span style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '-10px',
                            fontWeight: 'bold'
                        }}>
                            {data.name}
                        </span>
                    <RecBox image={data.image} text={data.name}/>
                </div>
            ))}
        </Scroll>
    )
}
const RecBox = ({image, text}) => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate(TRAINING, {
            state: {exercise: text}
        })
    }
    const image_url = process.env.PUBLIC_URL + '/' + image
    return (
        <>
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
                        border: 'none',
                    }}
            >
                <img src={image_url} alt="" style={{borderRadius: '16px'}}/>
            </button>
        </>

    );
};

function Exercise(props) {
    const goals = useSelector((state) => state.goals)

    //홈 트레이닝
    const exercises = {
        "lowerBodyExercises": [
            {name: "스쿼트", image: exerciseImage.squat},
            {name: "런지", image: exerciseImage.lunge},
            {name: "데드리프트", image: exerciseImage.deadLift},
        ],
        "abdominalExercises": [
            {name: "플랭크", image: exerciseImage.plank},
            {name: "크런치", image: exerciseImage.crunch},
            {name: "레그 레이즈", image: exerciseImage.legRaise},
        ],
        "armExercises": [
            {name: "푸시업", image: exerciseImage.pushUp},
            {name: "숄더 프레스", image: exerciseImage.shoulderPress},
            {name: "덤벨 로우", image: exerciseImage.dumbbellRow},
            {name: "해머 컬", image: exerciseImage.hammerCurl},

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
            <LinkBox url={SELECTED_EXERCISE} content='내가 선택한 운동 보기'/>
            <br/>

            <NavigationBar/>

        </Container>
    );
}

export default Exercise;
