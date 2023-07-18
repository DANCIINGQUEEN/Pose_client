import React from 'react';
import {Link, useNavigate} from "react-router-dom";

import {Container, NavigationBar, Scroll, ThemeColor} from "../UI/UIPackage";
import styled from "styled-components";

// import squat from '../public/exercise/lowerBody/squat.jpg'


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
        navigate('/training', {
            state: {exercise: text}
        })
    }
    const image_url = process.env.PUBLIC_URL + '/' + image
    // console.log(image_url)
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
    //lower
    const squat = 'exercise2/lower/squat.jpg'
    const lunge = 'exercise2/lower/lunge.jpg'
    const deadLift = 'exercise2/lower/deadLift.jpg'

    //abdominal
    const plank = 'exercise2/abdominal/plank.jpg'
    const crunch = 'exercise2/abdominal/crunch.jpg'
    const legRaise = 'exercise2/abdominal/legRaise.jpg'

    //arm
    const pushUp = 'exercise2/arm/pushUp.jpg'
    const shoulderPress = 'exercise2/arm/shoulderPress.jpg'
    const dumbbellRow = 'exercise2/arm/dumbbellRow.jpg'
    const hammerCurl = 'exercise2/arm/hammerCurl.jpg'
    //홈 트레이닝
    const exercises = {
        "lowerBodyExercises": [
            {name: "스쿼트", image: squat},
            {name: "런지", image: lunge},
            {name: "데드리프트", image: deadLift},
        ],
        "abdominalExercises": [
            {name: "플랭크", image: plank},
            {name: "크런치", image: crunch},
            {name: "레그 레이즈", image: legRaise},
        ],
        "armExercises": [
            {name: "푸시업", image: pushUp},
            {name: "숄더 프레스", image: shoulderPress},
            {name: "덤벨 로우", image: dumbbellRow},
            {name: "해머 컬", image: hammerCurl},

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
