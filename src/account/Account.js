import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";


import {Button, Container, NavigationBar, UserBox, ThemeColor} from "../UI/UIPackage";
import {logout} from "../state/userState";

const InfoBox = styled.div`
  //border: 1px solid black;
  width: 95%;
  border-radius: 16px;
  margin-top: 20px;
  padding: 0 0 10px 10px;
  background-color: ${ThemeColor.divColor};

  > :nth-child(1) {
    margin: 0;
    padding: 10px 0 0 10px;
    font-size: 12px;
    font-weight: bold;
  }

  > :nth-child(n+2) {
    font-size: 20px;
    padding: 10px 0 0 10px;
    margin: -5px 0 0 0;
    font-weight: bold;
  }
`
const rainbowAnimation = keyframes`
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

const RainbowDiv = styled.div`
  border: 2px solid;
  width: 95%;
  border-radius: 16px;
  //height: 60px;
  margin-top: 20px;
  padding: 0 0 10px 10px;
  background-color: ${ThemeColor.divColor};
  animation: ${rainbowAnimation} 5s linear infinite;

  > :nth-child(1) {
    margin: 0;
    padding: 10px 0 0 10px;
    font-size: 12px;
    font-weight: bold;
  }

  > :nth-child(n+2) {
    font-size: 20px;
    padding: 10px 0 0 10px;
    margin: -5px 0 0 0;
    font-weight: bold;
  }
`;

function Account(props) {
    const dispatch = useDispatch();
    const name = useSelector((state) => state.name)
    const email = useSelector((state) => state.email)
    const age = useSelector((state) => state.age)
    const weight = useSelector((state) => state.weight)
    const height = useSelector((state) => state.height)
    const exercise = useSelector((state) => state.exercise)
    const wishList = useSelector((state) => state.wishList)

    async function setLogout() {
        // Remove the JWT token from the session storage
        sessionStorage.removeItem('jwt');
        dispatch(
            logout()
        )
    }

    return (
        <Container>
            <h1>유저 정보</h1>
            <div style={{
                // border: '1px solid black',
                borderRadius: '20px',
                backgroundColor: `${ThemeColor.containerColor}`,
                width: '80%',
                margin: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'

            }}>

                {name &&
                    <UserBox name={name} email={email}/>
                }

                <InfoBox>
                    <p>나이</p>
                    <p>{age}살</p>
                </InfoBox>
                <InfoBox>
                    <p>몸무게</p>
                    <p>{weight} <span style={{fontSize: '15px'}}>kg</span></p>
                </InfoBox>
                <InfoBox>
                    <p>키</p>
                    <p>{height} <span style={{fontSize: '15px'}}>cm</span></p>
                </InfoBox>
                <RainbowDiv>
                    <p>주로 하는 운동</p>
                    <p>{exercise}</p>
                </RainbowDiv>
                <RainbowDiv>
                    <p>해결하고싶은 고민</p>

                    {
                        wishList.map((item, index) => {
                                return (
                                    <p key={index}>{index + 1}.&nbsp;{item}</p>
                                )
                            }
                        )
                    }

                </RainbowDiv>

            </div>
            <Link to={'/'}>
                <Button onClick={setLogout}>
                    로그아웃
                </Button>
            </Link>

            <NavigationBar/>


        </Container>
    );
}

export default Account;
