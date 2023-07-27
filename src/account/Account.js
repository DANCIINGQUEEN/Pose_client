import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";


import {Button, Container, NavigationBar, UserBox, ThemeColor, UserBoxSize, Loading} from "../UI/UIPackage";
import {getUserFullInfo, logout} from "../state/userState";

//아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {GET_USER_FULL_INFO} from "../api";

const InfoBox = styled.div`
  width: 120px;
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

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();
    const name = useSelector((state) => state.name)
    const email = useSelector((state) => state.email)
    const age = useSelector((state) => state.age)
    const weight = useSelector((state) => state.weight)
    const height = useSelector((state) => state.height)
    const exercise = useSelector((state) => state.exercise)
    const wishList = useSelector((state) => state.wishList)
    const followers = useSelector((state) => state.followers)
    const following = useSelector((state) => state.following)

    async function setLogout() {
        sessionStorage.removeItem('jwt');
        dispatch(
            logout()
        )
    }

    const getUserInfo = () => {
        const jwt = sessionStorage.getItem('jwt')
        const headers = {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
        setIsLoading(true)
        // console.log(isLoading)
        axios.get(GET_USER_FULL_INFO, {
            headers: headers
        }).then(response => {
            dispatch(
                getUserFullInfo({
                    name: response.data.name,
                    email: response.data.email,
                    age: response.data.age,
                    weight: response.data.weight,
                    height: response.data.height,
                    exercise: response.data.exercise,
                    wishList: response.data.wishList,
                    followers: response.data.followers,
                    following: response.data.following
                })
            )
            setIsLoading(false)
        }).catch(error => console.error(error))
    }


    useEffect(() => {
        getUserInfo()
    }, [name])

    return (
        <Container>
            <h1>유저 정보</h1>
            {isLoading && <Loading/>}
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
                <div style={{width: '70%', display: 'flex', justifyContent: 'space-between'}}>

                    {name &&
                        <UserBox name={name} email={email} size={UserBoxSize.large}/>
                    }
                    <Link to={'/usersetting'} style={{textDecoration: 'none', color: 'black'}}>

                        <FontAwesomeIcon icon={faGear} spin style={{fontSize: '25px', marginTop: '10px'}}/>
                    </Link>
                </div>
                {/*<InfoBox>*/}
                {/*    유저의 현재 운동 상태*/}
                {/*</InfoBox>*/}
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>

                    <InfoBox>
                        <p>팔로워</p>
                        <p>{followers ? followers && followers.length : '0'}명</p>
                    </InfoBox>

                    <InfoBox>
                        <p>팔로잉</p>
                        <p>{following ? following && following.length : '0'}명</p>
                    </InfoBox>
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
                </div>
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
