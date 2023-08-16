import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, getJWT, Loading, ThemeColor} from "../UI/UIPackage";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import confetti from "canvas-confetti";
import axios from "axios";
import {UPDATE_ATTAIN} from "../api";
import {updateAttain} from "../state/userState";

const MeterBar = styled.div`
  width: 300px;
  height: 20px;
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
const ProgressBar = ({goal, label}) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();


    const handleButtonClick = () => {
        console.log(progress)
        if (progress < goal) {
            setProgress(progress + 1);
        }
        if (progress + 1 === parseInt(goal)) {
            // setComplete(true);
            setIsComplete(true)
            // console.log('success')
            particle();
        }
    };

    function particle() {   //폭죽
        confetti({
            particleCount: 50,
            spread: 50
        });
    }


    const percent = ((progress / goal) * 100).toFixed(2);


   const handleUpdateAttain = () => {
       const headers=getJWT();
       setIsLoading(true)
       axios.post(UPDATE_ATTAIN,{
           exercise: label,
           attain: progress
       },{headers})
           .then((res)=>{
               console.log(res)
               setIsLoading(false)
               dispatch(updateAttain({
                   label: label,
                    attain: progress
               }))
           })
          .catch((err)=>{
              console.log(err)
              setIsLoading(false)
          })
   }
   // const goals=useSelector((state)=>state.goals)
   //  console.log(goals)

    return (
        <div style={{textAlign: 'center', padding: '20px'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '-20px'
            }}>
                <p>{progress}</p>
                <p>{goal}</p>
            </div>
            <MeterBar>
                <Progressbar style={{width: `${percent}%`}}>
                    <p></p>
                    <p style={{marginRight: '5px'}}>
                        {Math.round(percent)}%
                    </p>
                </Progressbar>
            </MeterBar>
            <button onClick={handleButtonClick}>+</button>
            <br/>
            <br/>
            <Button onClick={handleUpdateAttain}
                style={{
                backgroundColor: isComplete ? ThemeColor.buttonColor : ThemeColor.disabledButtonColor,
                width: '120px', height: '35px',

            }}>{isLoading?<Loading/>:'기록 저장'}</Button>
        </div>
    );
}

function AiTraining({text}) {
    // const [isComplete, setIsComplete] = useState(false);
    //
    //
    // const handleProgressBarComplete = (isComplete) => {
    //     setIsComplete(isComplete);
    // };
    const location = useLocation()
    const label = location.state?.label || ''
    const goals = useSelector((state) => state.goals)
    const goal = goals.find(goal => goal.label === label)?.number


    return (
        <Container>
            <h1>{text}</h1>
            <br/>
            {goal ? (
                    <>
                        <ProgressBar goal={goal} label={label}/>
                        {/*<Button style={{*/}
                        {/*    backgroundColor: isComplete ? ThemeColor.buttonColor : ThemeColor.disabledButtonColor,*/}
                        {/*    width: '110px', height: '35px',*/}

                        {/*}}>기록 저장</Button>*/}
                    </>
                )
                :
                (
                    <>
                        <h1>{text}</h1>
                        <br/>
                        {/*<Button>기록 저장</Button>*/}
                        <h5>안녕?</h5>
                    </>

                )}
        </Container>
    );
}

export default AiTraining;
