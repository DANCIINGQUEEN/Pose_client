import React, {useState} from 'react';
import {Container, NavigationBar, ThemeColor, PlusButton} from "../UI/UIPackage";
import {useSelector} from "react-redux";
import RecommendUser from "./RecommendUser";
import {RECOMMEND_USER, UPLOAD_POST, MY_POSTS, GET_POSTS} from '../api';

import styled from 'styled-components';
import Posts from "./Posts";
import MateTeam from "./MateTeam";

const MateNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 30px;
  position:sticky;
  top:10px;

  button {
    border: none;
    background-color: ${ThemeColor.navColor};
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 18px;
  }
`
const AllPosts = () => {
    const [showButtons, setShowButtons] = useState(false);
    const following = useSelector((state) => state.following)

    const plusMenuItem = [
        ['게시물 업로드', UPLOAD_POST],
        ['내 게시물 보기', MY_POSTS],
        ['추천 메이트', RECOMMEND_USER]
    ]
    return (
        <>
            {
                following ?
                    <>
                        <Posts API={GET_POSTS}/>
                        <PlusButton item={plusMenuItem}/>
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
                <button onClick={handleNavButtonClick} style={{fontWeight: isPostsClicked ? 'bold' : 'normal'}}>게시글
                </button>
                <button onClick={handleNavButtonClick} style={{fontWeight: isMateTeamClicked ? 'bold' : 'normal'}}>메이트
                    팀
                </button>
            </MateNav>
            {isPostsClicked ? <AllPosts/> : <MateTeam/>}
            <NavigationBar/>
        </Container>
    );
}

export default Community;
