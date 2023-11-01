import React from 'react';
import {useNavigate} from "react-router-dom";

import {Container,
    NavigationBar,
    Scroll,
    LinkBox,
    ExerciseButton,
    ExerciseBoxWrapper
} from "../UI/UIPackage";
import {TRAINING, SELECTED_EXERCISE} from '../../services/api'
import exerciseImage from '../../config/exerciseImagePath.json'





const Carousel = ({data}) => {
    return (
        <Scroll>
            {Object.values(data).map((data, index) => (
                <div key={index}>
                        <span className={'exerciseLabel'}>
                            {data.name}
                        </span>
                    <RecBox image={data.image} text={data.name} label={data.label}/>
                </div>
            ))}
        </Scroll>
    )
}
const RecBox = ({image, text, label}) => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate(TRAINING, {
            state: {
                exercise: text,
                label:label
            }})
    }
    const image_url = process.env.PUBLIC_URL + '/' + image
    return (
        <>
            <ExerciseButton onClick={handleButtonClick}>
                <img src={image_url} alt="" className={'exerciseImg'}/>
            </ExerciseButton>
        </>

    );
};

function EveryExercises() {

    //홈 트레이닝
    const exercises = {
        "lowerBodyExercises": [
            {name: "스쿼트", image: exerciseImage.squat, label:'squat'},
            {name: "런지", image: exerciseImage.lunge, label:'lunge'},
            {name: "데드리프트", image: exerciseImage.deadLift, label:'deadLift'},
        ],
        "abdominalExercises": [
            {name: "플랭크", image: exerciseImage.plank, label:'plank'},
            {name: "크런치", image: exerciseImage.crunch, label:'crunch'},
            {name: "레그 레이즈", image: exerciseImage.legRaise, label:'legRaise'},
        ],
        "armExercises": [
            {name: "푸시업", image: exerciseImage.pushUp, label:'pushUp'},
            {name: "숄더 프레스", image: exerciseImage.shoulderPress, label:'shoulderPress'},
            {name: "덤벨 로우", image: exerciseImage.dumbbellRow, label:'dumbbellRow'},
            {name: "해머 컬", image: exerciseImage.hammerCurl, label:'hammerCurl'},

        ]
    }

    return (
        <Container>
            <h1>운동</h1>
            <ExerciseBoxWrapper>
                <h3 className={'part'}>하체 운동</h3>
                <Carousel componentToRender={<RecBox/>} data={exercises.lowerBodyExercises}/>
            </ExerciseBoxWrapper>
            <ExerciseBoxWrapper>
                <h3 className={'part'}>복근 운동</h3>
                <Carousel componentToRender={<RecBox/>} data={exercises.abdominalExercises}/>
            </ExerciseBoxWrapper>
            <ExerciseBoxWrapper>
                <h3 className={'part'}>팔 운동</h3>
                <Carousel componentToRender={<RecBox/>} data={exercises.armExercises}/>
            </ExerciseBoxWrapper>
            <LinkBox url={SELECTED_EXERCISE} content='내가 선택한 운동 보기'/>
            <br/>

            <NavigationBar/>

        </Container>
    );
}

export default EveryExercises;
