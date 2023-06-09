import React, {useEffect, useRef, useState} from 'react';
import {Container} from "../UI/UIPackage";
import ProgressBar from "./ProgressBar";
import * as ml5 from "ml5";
import PoseNetprtc from "../prtc/PoseNetprtc";


function AiTraining({text}) {
    // const videoRef = useRef(null);
    // useEffect(() => {
    //     // 미디어 스트림 요청
    //     navigator.mediaDevices.getUserMedia({video: true})
    //         .then(mediaStream => {
    //             // 비디오 요소에 미디어 스트림 연결
    //             videoRef.current.srcObject = mediaStream;
    //             videoRef.current.play();
    //         })
    //         .catch(error => {
    //             console.error('Error accessing camera:', error);
    //         });
    // }, []);

    // const [progress, setProgress] = useState(0);
    // const duration = 1000; // 10초
    //
    // useEffect(() => {
    //     // 예시: 5초마다 progress 값을 증가시킴
    //     const interval = setInterval(() => {
    //         setProgress(prevProgress => prevProgress + 1);
    //     }, 5);
    //
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);
    // const progress = 50;
    // const duration = 100;
    return (
        <Container>
            <h1>{text}</h1>
            {/*<div*/}
            {/*    style={{display: 'flex', height: '600px', width: 'auto', overflow: 'hidden', justifyContent: 'center'}}>*/}
            {/*    <video ref={videoRef} autoPlay playsInline style={{*/}
            {/*        height: '100%',*/}
            {/*        width: '90%',*/}
            {/*        objectFit: 'cover',*/}
            {/*        transform: 'scaleX(-1)',*/}
            {/*        borderRadius: '16px'*/}
            {/*    }}/>*/}
            {/*</div>*/}
            <PoseNetprtc/>
            <br/>
                {/*<ProgressBar progress={progress} duration={duration} />*/}
            <progress style={{width:'90%'}}/>
            {/*</div>*/}
        </Container>
    );
}

export default AiTraining;
