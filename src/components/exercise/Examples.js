import React, {useState, useEffect} from 'react';
import YouTube from 'react-youtube';
import {Container} from "../UI/UIPackage";
import youtubeExerciseUrl from "../../config/youtubeExerciseUrl.json";
import {useLocation} from "react-router-dom";

const VideoPlayer = ({url}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const [playerWidth, setPlayerWidth] = useState(0);
    const [playerHeight, setPlayerHeight] = useState(0);


    // 재생 상태 변경 핸들러
    const handlePlayToggle = () => {
        setIsPlaying(!isPlaying);
    };

    // YouTube 동영상 옵션 설정
    const opts = {
        height: playerHeight,
        width: playerWidth,
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const aspectRatio = 16 / 9; // 가로 세로 비율 (16:9)

            // 브라우저 창의 너비에 따라 비율 계산
            let width = windowWidth
            let height = width / aspectRatio;

            // 너비가 화면에 맞지 않을 경우, 높이 기준으로 비율 계산
            if (height > windowHeight * 0.7) {
                height = windowHeight * 0.7;
                width = height * aspectRatio;
            }

            setPlayerWidth(Math.floor(width));
            setPlayerHeight(Math.floor(height));
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const thumbnailSource=`https://img.youtube.com/vi/${url}/maxresdefault.jpg`
    const thumbnailComponent=<img src={thumbnailSource} alt="Video Thumbnail" onClick={handlePlayToggle}/>

    return (
        <YouTube videoId={url} opts={opts} onEnd={handlePlayToggle}/>
    );
};

function Examples(props) {
    const location = useLocation()
    const label = location.state?.label || ''
    return (
        <>
            <br/>
            <VideoPlayer url={youtubeExerciseUrl[label]}/>

        </>
    );
}

export default Examples;
