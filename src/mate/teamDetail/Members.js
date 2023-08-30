import React, {useEffect, useState} from 'react';
import {Container, Loading, UserBox, UserBoxSize} from "../../UI/UIPackage";
import {useLocation} from "react-router-dom";
import axios from "axios";

import {GET_TEAM_MEMBERS} from "../../api";
import styled from "styled-components";

const Member = styled.main`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  > :nth-child(n) {
    min-width: 150px;
    margin: 10px;

  }
`

function Members(props) {
    const [members, setMembers] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    const teamId = location.pathname.split('/')[2]

    const getTeamMembers = async () => {
        await axios.get(`${GET_TEAM_MEMBERS}/${teamId}`)
            .then(res => setMembers(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    useEffect(() => {
        getTeamMembers().then()
    }, [])
    // console.table(members?.members)
    return (
        <Container>
            <h2>방장</h2>
            <UserBox name={members?.host.name} size={UserBoxSize.large}/>
            <br/>
            <br/>
            <h2>회원</h2>
            <Member>
                {members?.members?.map(member =>
                    <UserBox key={member._id} name={member.name} size={UserBoxSize.large}/>
                )}
            </Member>

        </Container>
    );
}

export default Members;