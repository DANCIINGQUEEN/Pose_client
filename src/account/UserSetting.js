import React, {useState} from 'react';
import {
    Button,
    Container,
    InfoBox,
    NavigationBar,
    Modal,
    rainbowAnimation,
    ThemeColor,
    UserBox,
    UserBoxSize,
} from "../UI/UIPackage";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../state/userState";
import {Link} from "react-router-dom";
import {USER_SETTING} from "../api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
    AgeSetting,
    FollowingFollowerSetting,
    HeightSetting,
    Hello,
    SettingModal,
    UserProfileSetting,
    ChangeUserProfile,
    WeightSetting,
    ShowFollowingFollower,
    FollowingSetting,
    FollowersSetting,
    ChangeAge,
    AreaSetting,
    ChangeArea,
    ShowFollowing,
    ShowFollowers, ChangeWeight, ChangeHeight
} from "./DetailSetting";

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


function UserSetting(props) {
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

    return (
        <Container>
            <h1>유저 정보 수정</h1>
            <h5>각 항목을 클릭하면 수정할 수 있습니다</h5>

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

                <div style={{display: 'flex',flexWrap:'wrap', justifyContent: 'center'}}>
                    <Modal buttonComponent={<UserProfileSetting email={email} name={name}/>}
                           componentToRender={<ChangeUserProfile email={email} name={name}/>}/>

                    <Modal buttonComponent={<FollowersSetting followers={followers} />}
                           componentToRender={<ShowFollowers followers={followers} />}/>

                    <Modal buttonComponent={<FollowingSetting following={following}/>}
                           componentToRender={<ShowFollowing following={following}/>}/>


                    <Modal buttonComponent={<AgeSetting age={age}/>} componentToRender={<ChangeAge/>}/>

                    <Modal buttonComponent={<AreaSetting area={area}/>} componentToRender={<ChangeArea/>}/>

                    <Modal buttonComponent={<WeightSetting weight={weight}/>} componentToRender={<ChangeWeight/>}/>

                    <Modal buttonComponent={<HeightSetting height={height}/>} componentToRender={<ChangeHeight/>}/>

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

            <NavigationBar/>


        </Container>
    );
}

export default UserSetting;
