import React, {useState} from 'react';
import {Container, NavigationBar, ThemeColor} from "../UI/UIPackage";
import {useSelector} from "react-redux";
import RecommendUser from "./RecommendUser";
import MateDashboard from "./MateDashboard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {RECOMMEND_USER, UPLOAD_POST} from '../api';

import styled from 'styled-components';
import Posts from "./Posts";

const PlusButton = styled(Link)`
  position: fixed;
  width: 50px;
  bottom: 75px;
  left: calc(50% + 130px);
  height: 50px;
  border-radius: 50%;
  background-color: black;
  border: none;
  color: white;
  font-size: 30px;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${ThemeColor.importantColor};

  }
  // &:focus {
  //   background-color: ${ThemeColor.importantColor};
  // }
`
const AnimatedButton = styled(Link)`
  position: fixed;
  width: 150px;
  bottom: ${({ distance }) => distance}px;
  left: calc(50% + 30px);
  height: 35px;
  border-radius: 12px;
  background-color: ${ThemeColor.importantColor};
  border: none;
  color: black;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-top: 4px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0' : '20px')});
  transition: opacity 0.3s, transform 0.3s;

  &:hover {
    background-color: black;
    color:white;
  }
`;

function Community(props) {
    const [showButtons, setShowButtons] = useState(false);

    const handlePlusButtonClick = () => {
        setShowButtons(!showButtons);
    };
    const following = useSelector((state) => state.following)


    return (
        <Container>
            <h1>메이트</h1>
            <PlusButton
                // to={UPLOAD_POST}
                onClick={handlePlusButtonClick}>+</PlusButton>
            {
                following ?
                    (
                        <>
                                <Posts/>

                        </>
                    )
                    :
                    (
                        <RecommendUser/>
                    )

            }
            <AnimatedButton visible={showButtons} distance={140} to={UPLOAD_POST}>
                게시물 업로드
            </AnimatedButton>
            <AnimatedButton visible={showButtons} distance={190} to={RECOMMEND_USER}>
                추천 메이트
            </AnimatedButton>
            <NavigationBar/>

        </Container>
    );
}

export default Community;
