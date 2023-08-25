import React from 'react';
import {Container} from "../../UI/UIPackage";
import {useLocation} from "react-router-dom";
import Notice from "./Notice";
import Board from "./Board";
import Exercise from "./Exercise";
import Members from "./Members";
import Chat from "./Chat";

function TeamDetail(props) {
    const location = useLocation()
    const form = location.state?.detailPage
    const name = location.state?.name
    const desc = location.state?.desc
    const detailSwitch = {
        TEAM_NOTICE: <Notice/>,
        TEAM_BOARD: <Board/>,
        TEAM_EXERCISE: <Exercise/>,
        TEAM_MEMBERS: <Members/>,
        TEAM_CHAT: <Chat/>,
    }
    return (
        <Container>
            <h1>{name}</h1>
            <h3 style={{marginTop: '0px'}}>{desc}</h3>
            {detailSwitch[form]}
        </Container>
    );
}

export default TeamDetail;