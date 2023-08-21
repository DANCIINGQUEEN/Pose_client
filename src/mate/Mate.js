import React, {useState} from 'react';
import {Container, NavigationBar, ThemeColor} from "../UI/UIPackage";
import {useSelector} from "react-redux";
import RecommendUser from "./RecommendUser";
import {Link} from "react-router-dom";
import {RECOMMEND_USER, UPLOAD_POST, MY_POSTS, GET_POSTS} from '../api';

import styled from 'styled-components';
import Posts from "./Posts";
import MateTeam from "./MateTeam";

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
  display:${({visible})=>visible?'block':'none'};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0' : '20px')});
  transition: opacity 0.3s, transform 0.3s;

  &:hover {
    background-color: black;
    color:white;
  }
`;

const MateNav= styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //margin: 10px 0 10px 10px;
  width: 200px;
  height:30px;
  button{
    border: none;
    background-color: transparent;
    font-size: 18px;
  }
`
const AllPosts=()=>{
    const [showButtons, setShowButtons] = useState(false);
    const following = useSelector((state) => state.following)
    const handlePlusButtonClick = () => {
        setShowButtons(!showButtons);
    };
    return(
        <>
            {
                following ?
                    <>
                            <Posts API={GET_POSTS}/>
                            <PlusButton onClick={handlePlusButtonClick}>+</PlusButton>
                            <AnimatedButton visible={showButtons} distance={140} to={UPLOAD_POST}>
                                게시물 업로드
                            </AnimatedButton>
                            <AnimatedButton visible={showButtons} distance={190} to={MY_POSTS}>
                                내 게시물 보기
                            </AnimatedButton>
                            <AnimatedButton visible={showButtons} distance={240} to={RECOMMEND_USER}>
                                추천 메이트
                            </AnimatedButton>
                        </>
                    :
                    <RecommendUser/>
            }
        </>
    )
}
function Community(props) {
    const [isPostsClicked, setIsPostsClicked] = useState(true);
    const [isMateTeamClicked, setIsMateTeamClicked] = useState(false);

    const handleNavButtonClick = () => {
        setIsPostsClicked(!isPostsClicked);
        setIsMateTeamClicked(!isMateTeamClicked);
    }

    return (
        <Container>
            <h1>메이트</h1>
            <MateNav>
            <button onClick={handleNavButtonClick} style={{fontWeight:isPostsClicked?'bold':'normal'}}>게시글</button>
            <button onClick={handleNavButtonClick} style={{fontWeight:isMateTeamClicked?'bold':'normal'}}>메이트 팀</button>
            </MateNav>
            {isPostsClicked? <AllPosts/> : <MateTeam/>}
            <NavigationBar/>
        </Container>
    );
}

export default Community;
