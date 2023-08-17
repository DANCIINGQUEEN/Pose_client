import styled from "styled-components";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ACCOUNT, MATE, SELECTED_EXERCISE, WISH_EXERCISE} from "../api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDumbbell, faHouse, faPeopleGroup, faUser} from "@fortawesome/free-solid-svg-icons";
import {ThemeColor} from "./UIPackage";

const Nav = styled.nav`
  z-index: 999;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 390px;
  height: 60px;
  //overflow: auto; /* 추가된 부분 */
  background-color: ${ThemeColor.navColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  //overflow: hidden;
  // box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 16px 16px 0 0;
`;
const BodyPadding = styled.div`
  padding-bottom: 60px;
  display: flex;
  justify-content: center;
`;
const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //color: #9b9b9b;
  color: ${ThemeColor.navColor};
  font-size: 0.8rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const NavigationBar = ({onExerciseClick, onRankingClick, onCommunityClick, onMateClick, onAccountClick}) => {
    const [activateLink, setActivateLink] = useState(null)
    const goals = useSelector((state) => state.goals)

    const style = {
        textDecoration: 'none',
        color:'black',
        display: 'flex',
        flexDirection: 'column',
    }
    const iconStyle = {
        fontSize: '20px',
    }
    const fontStyle = {
        fontSize: '0.6rem',
    }

    const handleLinkClick = (link) => {
        setActivateLink(link)
    }
    return (
        <BodyPadding>
            <Nav>
                <NavButton onClick={() => handleLinkClick('exercise')}>
                    <Link to={goals ? SELECTED_EXERCISE : WISH_EXERCISE} style={style}>
                        <FontAwesomeIcon icon={faDumbbell} style={iconStyle}/>
                        <span style={fontStyle}>
                        운동
                    </span>
                    </Link>
                </NavButton>
                <NavButton onClick={onMateClick}>
                    <Link to={'/'} style={style}>
                        <FontAwesomeIcon icon={faHouse} style={iconStyle}/>
                        <span style={fontStyle}>
                        홈
                    </span>
                    </Link>
                </NavButton>
                <NavButton onClick={onCommunityClick}>
                    <Link to={MATE} style={style}>
                        <FontAwesomeIcon icon={faPeopleGroup} style={iconStyle}/>
                        <span style={fontStyle}>
                        메이트
                    </span>
                    </Link>
                </NavButton>

                <NavButton onClick={onAccountClick}>
                    <Link to={ACCOUNT} style={style}>
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/>
                        <span style={fontStyle}>
                        계정
                    </span>
                    </Link>
                </NavButton>
            </Nav>
        </BodyPadding>
    );
};