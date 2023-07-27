import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, ThemeColor} from "../UI/UIPackage";
// import ProgressBar from "./ProgressBar";
import * as ml5 from "ml5";
import PoseNetprtc from "../prtc/PoseNetprtc";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Like from "../prtc/Like";
import confetti from "canvas-confetti";

const MeterBar = styled.div`
  width: 300px;
  height: 20px;
  //border: 1px solid black;
  background-color: ${ThemeColor.importantColor};
  margin: 10px auto;
  position: relative;
  border-radius: 10px;
`
const Progressbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 20px;
  border-radius: 10px;
  
  background-color: blue;`
const ProgressBar = ({goal, onComplete}) => {
    const [progress, setProgress] = useState(0);
    // const [complete, setComplete] = useState(false);

    const handleButtonClick = () => {
        console.log(progress)
        if (progress < goal) {
            setProgress(progress + 1);
        }
        if (progress+1 === parseInt(goal)) {
            // setComplete(true);
            onComplete(true)
            console.log('success')
            particle();
        }
    };
    // console.log(typeof(goal), typeof(parseInt(goal)))
    function particle() {   //폭죽
        confetti({
            particleCount: 50,
            spread: 50
        });
    }


    const percent = ((progress / goal) * 100).toFixed(2);

    return (
        <div style={{textAlign: 'center', padding: '20px'}}>
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    marginBottom:'-20px'
                }}>
                    <p>{progress}</p>
                    <p>{goal}</p>
                </div>
            <MeterBar>
                <Progressbar style={{width: `${percent}%`}}>
                    <p></p>
                    <p style={{marginRight:'5px'}}>
                        {Math.round(percent)}%
                    </p>
                </Progressbar>
            </MeterBar>
            <button onClick={handleButtonClick}>+</button>
        </div>
    );
}

function AiTraining({text}) {
    const [isComplete, setIsComplete] = useState(false);

    // Define the callback function to update the complete state
    const handleProgressBarComplete = (isComplete) => {
        setIsComplete(isComplete);
    };
    const location = useLocation()
    const label = location.state?.label || ''
    const goals = useSelector((state) => state.goals)
    const goal = goals.find(goal => goal.label === label).number
    console.log(goals[0].cycle)


    return (
        <Container>
            <h1>{text}</h1>

            {/*<PoseNetprtc/>*/}
            <br/>
            {/*<ProgressBar progress={progress} duration={duration} />*/}
            {/*<progress style={{width:'90%'}}/>*/}
            <ProgressBar goal={goal} onComplete={handleProgressBarComplete}/>
            {/*</div>*/}
            <Button style={{
                backgroundColor: isComplete ? ThemeColor.buttonColor : ThemeColor.disabledButtonColor,
                width:'110px', height:'35px',

            }}>기록 저장</Button>
        </Container>
    );
}

export default AiTraining;
