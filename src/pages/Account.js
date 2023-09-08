import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";


import {
    Button,
    Container,
    NavigationBar,
    UserBox,
    ThemeColor,
    UserBoxSize,
    AccountInfoBox,
    rainbowAnimation, Modal
} from "../components/UI/UIPackage";
import {USER_SETTING} from '../services/api'
import {getUserFullInfo, logout} from "../store/userState";

//아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {API, GET_USER_FULL_INFO} from "../services/api";
import {
    AgeSetting,
    AreaSetting, ExerciseSetting,
    FollowersSetting,
    FollowingSetting, HeightSetting,
    ShowFollowers,
    ShowFollowing, WeightSetting
} from "../components/account/DetailSetting";

const RainbowDiv = styled.div`
  border: 2px solid;
  width: 300px;
  border-radius: 16px;
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
    const {
        name,
        email,
        age,
        area,
        weight,
        height,
        exercise,
        wishList,
        followers,
        following,
    } = useSelector((state) => state);

    async function setLogout() {
        dispatch(
            logout()
        )
    }

    return (
        <Container>
            <h1>유저 정보</h1>
            <div style={{
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
                    <Link to={USER_SETTING} style={{textDecoration: 'none', color: 'black'}}>

                        <FontAwesomeIcon icon={faGear} spin style={{fontSize: '25px', marginTop: '10px'}}/>
                    </Link>
                </div>

                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>

                    <Modal button={<FollowersSetting followers={followers}/>}
                           render={<ShowFollowers followers={followers}/>}/>

                    <Modal button={<FollowingSetting following={following}/>}
                           render={<ShowFollowing following={following}/>}/>
                    <AccountInfoBox>
                        <AgeSetting age={age}/>
                    </AccountInfoBox>
                    <AccountInfoBox>
                        <AreaSetting area={area}/>
                    </AccountInfoBox>
                    <AccountInfoBox>
                        <WeightSetting weight={weight}/>
                    </AccountInfoBox>
                    <AccountInfoBox>
                        <HeightSetting height={height}/>
                    </AccountInfoBox>
                </div>
                <RainbowDiv>
                    <ExerciseSetting exercise={exercise}/>
                </RainbowDiv>
                <RainbowDiv>
                    <p>해결하고싶은 고민</p>
                    {wishList.length===0 &&<p style={{fontSize: '15px'}}>등록되지 않음</p>}
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
