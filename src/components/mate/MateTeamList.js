import React, {useEffect, useState} from 'react';
import {functions} from "../../utils/Functions";
import axios from "axios";
import {GET_ALL_TEAMS, JOIN_TEAM} from "../../services/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Button, Loading, TeamSummaryBox, Hashtag, Container} from "../UI/UIPackage";

function MateTeamList() {
    const [teams, setTeams] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const getTeams = async () => {
        const headers = functions.getJWT()
        axios.get(GET_ALL_TEAMS, {headers})
            .then(res => setTeams(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    const joinTeam = async (teamId) => {
        const headers = functions.getJWT()
        setIsLoading(true)
        axios.post(JOIN_TEAM, {teamId: teamId}, {headers: headers})
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getTeams().then()
    }, [])
    return (
        <Container>
            <h3>메이트 팀 목록</h3>
            {teams?.map((team, index) => (
                <TeamSummaryBox key={index}>
                    <h2>{team.name}</h2>
                    <Hashtag>
                        {team.hashtag.map((hashTag, index) => (
                            <span key={index}>{hashTag}</span>))}
                    </Hashtag>
                    <h3>{team.description}</h3>
                    <div>
                        <div className={'feedback'}>
                            <FontAwesomeIcon icon={faUser}/>
                            <span>{team.members}</span>
                        </div>
                        <Button onClick={() => joinTeam(team._id)}>
                            {isLoading ? <Loading/> : '가입하기'}
                        </Button>
                    </div>
                </TeamSummaryBox>
            ))}
        </Container>
    )
}

export default MateTeamList;