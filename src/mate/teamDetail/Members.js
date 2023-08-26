import React, {useEffect, useState} from 'react';
import {Container, Loading, UserBox, UserBoxSize} from "../../UI/UIPackage";
import {useLocation} from "react-router-dom";
import axios from "axios";

import {GET_TEAM_MEMBERS} from "../../api";
import styled from "styled-components";

const Member=styled.div`
    //display: flex;
  //flex-direction: column;
  align-items: center;
  justify-self: flex-start;
  width: 310px;
  height:80px;
  margin:10px 0;
  section{
    //margin-top:1px;
    //border:1px solid black;
  }
  .detail{
    margin:0 3px;
  }
`

function Members(props) {
    const [members, setMembers] = useState()
    // const [host, setHost] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const location=useLocation()
    const teamId=location.pathname.split('/')[2]

    const getTeamMembers = async () => {
        // setIsLoading(true)
        await axios.get(`${GET_TEAM_MEMBERS}/${teamId}`)
            .then(res => setMembers(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    useEffect(() => {
        getTeamMembers().then()
    }, [])
    console.log(members.members, members.host.name)
    return (
        <Container>
            <h2>회원</h2>
            <div>
<h4>방장</h4>
                <UserBox name={members?.host.name} email={members?.host.email} size={UserBoxSize.small}/>
                <section>
                    {members?.host.sex && <span className={'detail'}>{members.host.sex}</span>}
                    {members?.host.area && <span className={'detail'}>{members.host.area}</span>}
                    {members?.host.age && <span className={'detail'}>{members.host.age}</span>}
                </section>
            </div>
            {members?.members.map(member =>
                <>
                {isLoading? <Loading/>:
                    <Member key={member._id}>
                        <UserBox name={member.name} email={member.email} size={UserBoxSize.small}/>
                        <section>
                            {member.sex && <span className={'detail'}>{member.sex}</span>}
                            {member.area && <span className={'detail'}>{member.area}</span>}
                            {member.age && <span className={'detail'}>{member.age}</span>}
                        </section>
                    </Member>
                }
                </>
                )}

        </Container>
    );
}

export default Members;