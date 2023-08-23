import React from 'react';
import styled, {keyframes} from 'styled-components';

//캐러셀
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//UI 패키지 임포트
import {ThemeColor, UserBoxSize} from "./BasicUI";
import CustomSelect from "./Select";
import {HorizonLine} from './HorizonLine'
import {UserProfile} from "./UserProfile";
import {Loading} from "./Loading";
import {UserBox} from "./UserBox";
import {Modal} from "./Modal";
import {NavigationBar} from "./NavigationBar";
import {PlusButton} from "./PlusButton";
import {LinkBox} from "./LinkBox";


export const rainbowAnimation = keyframes`
  0% {
    border-color: red;
  }
  14% {
    border-color: orange;
  }
  28% {
    border-color: yellow;
  }
  42% {
    border-color: green;
  }
  57% {
    border-color: blue;
  }
  71% {
    border-color: indigo;
  }
  85% {
    border-color: violet;
  }
  100% {
    border-color: red;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const Box = styled.div`
  background-color: ${ThemeColor.containerColor};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-bottom: 37px;
  width: 370px;
`
export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 16px;
  padding: 0 20px;
  background-color: ${ThemeColor.divColor};
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border: 2px solid;
    animation: ${rainbowAnimation} 5s linear infinite;

  }

`
export const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 16px;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
  background-color: ${ThemeColor.buttonColor};
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border: 1px solid;
    animation: ${rainbowAnimation} 5s linear infinite;
  }
`
export const AccountInfoBox = styled.div`
  width: 130px;
  border-radius: 16px;
  background-color: ${ThemeColor.divColor};
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 10px;

  > :nth-child(1) {
    margin: 0;
    padding: 10px 0 0 15px;
    font-size: 12px;
    font-weight: bold;
  }

  > :nth-child(2) {
    font-size: 20px;
    padding: 10px 0 10px 15px;
    margin: -5px 0 0 0;
    font-weight: bold;
  }
`
export const Scroll = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display:none;
  }
`
export const Hashtag = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 330px;

  &::-webkit-scrollbar {
    display: none;
  }

  span {
    padding: 0 10px;
    margin-left: 10px;
    font-size: 20px;
    background-color: ${ThemeColor.importantColor};
    border-radius: 10px;
    font-weight: bold;

    &:before {
      content: '#';
    }

  }
`
export const TeamSummaryBox = styled(Box)`
  width: 330px;

  h2, h3 {
    margin-left: 20px;
  }

  div {
    width: 92%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 10px;
    justify-content: space-between;

  }

  Button {
    width: 120px;
    font-weight: bold;
  }

  .feedback {
    width: 110px;
    justify-content: space-around;
  }
`
export const TeamInfoBox=styled.button`
  background-color: ${ThemeColor.containerColor};
  border: none;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content:space-around;
  margin-bottom: 20px;
  width: 330px;
  padding-bottom: 10px;
  :hover {
    background-color: ${ThemeColor.divColor};
  }

  h2 {
    font-size: 25px;
    margin-left: 10px;
  }

  p {
    margin: 1px 0 15px 10px;
    font-size: 18px;
  }

  span {
    margin:-5px 0 5px 10px;
    font-size: 15px;
  }

  .board {
    margin: 1px 0 15px 0;
    display: flex;
    flex-direction: row;
    >:first-child{
      font-weight: bold;
    }
    >:nth-child(2){
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
   }
  }
`

export const RecBox = ({componentToRender}) => {
    return (
        <div
            style={{
                width: "123px",
                height: "161px",
                backgroundColor: `${ThemeColor.importantColor}`,
                margin: "10px",
                marginLeft: '20px',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                borderRadius: '16px'
            }}
        >
            {componentToRender}
        </div>
    );
};
export const PillBox = ({text}) => {
    return (
        <div
            style={{
                width: "120px",
                height: "32px",
                backgroundColor: `${ThemeColor.importantColor}`,
                margin: "10px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                borderRadius: '16px'
            }}
        >
            {text}
        </div>
    );
};

export const CarouselList = ({componentToRender, list}) => {
    const settings = {
        arrows: false,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2.8,
        onSwipe: null,
    };
    return (
        <div style={{maxWidth: "380px", margin: '0 0 0 10px'}}>
            <Slider {...settings} >
                {list.map((text, index) => (
                    <div key={index}>{React.cloneElement(componentToRender, {text})}</div>
                ))}
            </Slider>
        </div>
    );
}
export const exerciseName = {
    squat: '스쿼트',
    lunge: '런지',
    pushUp: '푸쉬업',
    crunch: '크런치',
    plank: '플랭크',
    deadLift: '데드리프트',
    shoulderPress: '숄더 프레스',
    dumbbellRow: '덤벨 로우',
    hammerCurl: '해머 컬',
    legRaise: '레그 레이즈'
}
export const exerciseImage = {
    squat: 'exercise2/lower/squat.jpg',
    lunge: 'exercise2/lower/lunge.jpg',
    deadLift: 'exercise2/lower/deadLift.jpg',

    //abdominal
    plank: 'exercise2/abdominal/plank.jpg',
    crunch: 'exercise2/abdominal/crunch.jpg',
    legRaise: 'exercise2/abdominal/legRaise.jpg',

    //arm
    pushUp: 'exercise2/arm/pushUp.jpg',
    shoulderPress: 'exercise2/arm/shoulderPress.jpg',
    dumbbellRow: 'exercise2/arm/dumbbellRow.jpg',
    hammerCurl: 'exercise2/arm/hammerCurl.jpg'
}


export {
    CustomSelect,
    HorizonLine,
    UserProfile,
    Loading,
    UserBox,
    Modal,
    NavigationBar,
    PlusButton,
    LinkBox,
    ThemeColor,
    UserBoxSize

}