import React, {useEffect, useRef, useState} from 'react';
import styled, {keyframes} from "styled-components";
import {Button, InfoBox, Modal, ThemeColor, UserBox, UserBoxSize} from "../UI/UIPackage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export const SettingModal = () => {
    return (
        <>fuck you</>
    )

}
export const Hello = () => {
    return (
        <>hello</>
    )
}

export const UserProfileSetting = ({name, email}) => {
    return (
        <div style={{
            width: '300px',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: ThemeColor.divColor,
            borderRadius: '16px',
            padding: '10px 0px',
            marginLeft: '10px'
        }}>
            {name &&
                <UserBox name={name} email={email} size={UserBoxSize.large}/>
            }

        </div>
    )
}
export const FollowingFollowerSetting = ({followers, following}) => {
    return (
        <InfoBox style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: ThemeColor.divColor,
            borderRadius: '16px',
            width: '300px'
        }}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <span>팔로워</span>
                <span>팔로잉</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <span>{followers ? followers && followers.length : '0'}명</span>
                <span>{following ? following && following.length : '0'}명</span>

            </div>
        </InfoBox>
    )
}
export const AgeSetting = ({age}) => {
    return(
        <InfoBox style={{width: '300px'}}>
            <p>나이</p>
            <p>{age}</p>
        </InfoBox>
    )
}

export const WeightSetting = ({weight}) => {
    return(
        <InfoBox style={{width: '300px'}}>
            <p>몸무게</p>
            <p>{weight} <span style={{fontSize: '15px'}}>kg</span></p>
        </InfoBox>
    )
}
export const HeightSetting = ({height}) => {
    return(
        <InfoBox style={{width: '300px'}}>
            <p>키</p>
            <p>{height} <span style={{fontSize: '15px'}}>cm</span></p>
        </InfoBox>
    )
}
export default {
    SettingModal,
    Hello,
    UserProfileSetting,
    FollowingFollowerSetting,
    AgeSetting,
    WeightSetting,
    HeightSetting
};