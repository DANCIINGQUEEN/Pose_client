import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {GET_RECOMMEND_USER, GET_UNFOLLOW} from '../api'
import {Button, Loading, ThemeColor, UserBox, UserBoxSize, getJWT} from "../UI/UIPackage";
import styled from "styled-components";

import {FOLLOW_USER} from "../api";
import {useDispatch} from "react-redux";
import {putFollow, putFollowingNames} from "../state/userState";

const UserInfoBox = styled.div`
  width: 320px;
  background-color: ${ThemeColor.divColor};
  border-radius: 16px;
  padding: 10px 15px 0 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Detail = styled.p`
  background-color: ${ThemeColor.importantColor};
  border-radius: 10px;
  margin-right: 5px;
  padding: 5px;
`

const FollowButton = ({userId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const dispatch = useDispatch();
    const handleFollow = async () => {
        try {
            setIsLoading(true);
            const headers = getJWT();
            const url = isFollowing ? GET_UNFOLLOW : FOLLOW_USER;
            const data = isFollowing ? { friend: userId } : { userIdToFollow: userId };

            const response = await axios.post(url, data, { headers });

            dispatch(putFollow({ following: response.data.following }));
            dispatch(putFollowingNames({ followingNames: response.data.followingNames }));
            setIsFollowing((isFollowing) => !isFollowing);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button style={{
            width: '95px',
            backgroundColor: isFollowing ? ThemeColor.disabledButtonColor : ThemeColor.buttonColor
        }}
                onClick={handleFollow}>
            {isLoading ? <Loading/> : isFollowing ? "취소" : "팔로잉"}
        </Button>
    )
}
const RecommendUser = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const headers = getJWT()
            const response = await axios.get(GET_RECOMMEND_USER,
                {headers: headers});
            setUsers(response.data.recommendedUsers);
        } catch (error) {
            console.error(error);
        }finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, []);

    return (
        <div>
            <h2>추천 유저</h2>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {isLoading && (<Loading/>)}
            </div>
            {users?.map(user => (
                <UserInfoBox key={user._id}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <UserBox name={user.name} email={user.email} size={UserBoxSize.small}/>
                        <div style={{display: 'flex'}}>
                            <Detail>{user.sex}</Detail>
                            <Detail>{user.area}</Detail>
                            <Detail>{user.age}</Detail>
                        </div>
                    </div>
                    <FollowButton userId={user._id}/>
                </UserInfoBox>
            ))}

        </div>
    );
};

export default RecommendUser;
