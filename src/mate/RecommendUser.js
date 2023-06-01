import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {GET_RECOMMEND_USER} from '../api'
import {Button, ThemeColor, UserBox, UserBoxSize} from "../UI/UIPackage";
import styled from "styled-components";

const UserInfoBox=styled.div`
  width: 320px;
  background-color: ${ThemeColor.divColor};
  border-radius: 16px;
  padding: 10px 15px 0 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Detail=styled.p`
    background-color: ${ThemeColor.importantColor};
    border-radius: 10px;
    margin-right: 5px;
    padding: 5px;
`
const RecommendUser = () => {
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     fetchUsers();
    // }, []);
    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(GET_RECOMMEND_USER);
            setUsers(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h2>추천 유저</h2>
            {users.map(user => (
                <UserInfoBox key={user._id}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <UserBox name={user.name} email={user.email} size={UserBoxSize.small}/>
                    <div style={{display:'flex'}}>
                        <Detail>{user.sex}</Detail>
                        <Detail>{user.area}</Detail>
                        <Detail>{user.age}</Detail>
                    </div>
                    </div>
                        <Button style={{width:'92px'}}>팔로우</Button>

                    {/* Render other user fields as needed */}
                </UserInfoBox>
            ))}
        </div>
    );
};

export default RecommendUser;
