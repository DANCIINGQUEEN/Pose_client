import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";


import {
    Button,
    ToggleButton,
    Input,
    UserProfile,
    UserBoxSize,
    FeedbackButton,
    NoticeBox,
    FeedbackList, CommentsList, ThemeColor, Loading, Container, Box, TwoTabNav, UserBox
} from "../../UI/UIPackage";
import {POST_TEAM_BOARD, GET_TEAM_BOARD, POST_TEAM_BOARD_COMMENT} from "../../../services/api";
import {faArrowUp, faComment, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {functions} from "../../UI/Functions";

const CommentInput = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 345px;
  
  input {
    position: relative;
    height: 50px;
    border-radius: 10px;
    padding: 0 15px;
    z-index: 1;
  }


  button {
    position: relative;
    border: none;
    background-color: ${ThemeColor.disabledButtonColor};
    width: 40px;
    height: 40px;
    border-radius: 10px;
    right: 43px;
    bottom: 5px;
    z-index: 2;

    &:hover {
      background-color: ${ThemeColor.buttonColor};
    }

`

const CommentList = ({display, onChange, board, isAnonymous, userName}) => {
    const comment = useRef("")
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState(board.comments)

    const location = useLocation()
    const teamId = location.pathname.split('/')[2]

    const handleCommentSubmit = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        try {
            await axios.post(`${POST_TEAM_BOARD_COMMENT}/${teamId}`, {
                boardId: board._id,
                comment: comment.current.value,
                isAnonymous: isAnonymous
            }, {headers})
            setComments(comments => [...comments, isAnonymous ? comment.current.value : {
                user: userName,
                content: comment.current.value
            }])

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }
    const buttonStyle = {
        display: display ? 'block' : 'none'
    }
    const handleCommentButtonClick = () => {
        display = !display
        onChange(display)
    }
    return (
        <FeedbackList style={{...buttonStyle}}>
            {(comments.length === 0) && <p>댓글이 없습니다.</p>}
            {comments?.map((comment, index) => {
                return (
                    <CommentsList key={index}>
                        {isAnonymous ?
                            <>
                                <span>익명{index + 1}</span>
                                <span style={{marginLeft: '10px'}}>{comment}</span>
                            </>
                            :
                            <>
                                <div>
                                    <UserProfile text={comment.user} size={UserBoxSize.small}/>
                                    <span>{comment.user}</span>
                                </div>
                                <span style={{marginLeft: '10px'}}>{comment.content}</span>
                            </>
                        }
                    </CommentsList>
                )
            })
            }
            <CommentInput>

                <Input type="text" placeholder={'댓글을 입력하세요'} ref={comment}/>
                <button onClick={handleCommentSubmit}>
                    {isLoading ? <Loading/> : <FontAwesomeIcon icon={faArrowUp} />}
                </button>
            </CommentInput>
            <button className={'close'} onClick={handleCommentButtonClick}>닫기</button>
        </FeedbackList>
    )
}
const EachBoard = ({board, name, isAnonymous}) => {
    const [isCommentButtonClick, setIsCommentButtonClick] = useState(false)
    const handleCommentButtonClick = () => setIsCommentButtonClick(isCommentButtonClick => !isCommentButtonClick)
    return (
        <>
            <NoticeBox>
                {isAnonymous ?
                    <>
                        <span className={'title'} style={{marginTop: '10px'}}>{board.postTitle}</span>
                        <article>
                            <span className={'boardContent'}>{board.postContent}</span>
                            <FeedbackButton className={'comments'} onClick={handleCommentButtonClick}>
                                <FontAwesomeIcon className={'comment'} icon={faComment}/>
                                <span>{board.comments?.length}개</span>
                            </FeedbackButton>
                        </article>
                    </>
                    :
                    <>
                        <main>
                            <section>
                                <UserBox name={board.author} size={UserBoxSize.small}/>
                                <FontAwesomeIcon icon={faEllipsisVertical}/>
                            </section>
                            <span className={'title'}>{board.postTitle}</span>
                            <article>
                                <span className={'boardContent'}>{board.postContent}</span>
                                <FeedbackButton className={'comments'} onClick={handleCommentButtonClick}>
                                    <FontAwesomeIcon className={'comment'} icon={faComment}/>
                                    <span>{board.comments?.length}개</span>
                                </FeedbackButton>
                            </article>
                        </main>
                    </>}

            </NoticeBox>
            <CommentList board={board} display={isCommentButtonClick} userName={name} isAnonymous={isAnonymous}
                         onChange={handleCommentButtonClick}/>

        </>
    )
}
const WriteBoardContainer = styled.div`
  width: 300px;
  display: ${props => props.isDisplay ? 'block' : 'none'};

  Button {
    width: 110px;
  }

  .toggle {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;

    span {
      font-weight: bold;
    }

    div {
      display: flex;
      justify-content: space-between;
      width: 130px;
    }
  }

  .button {
    display: flex;
    justify-content: space-evenly;
  }

`
const WriteBoard = ({display, onChange, teamId}) => {
    const comment = {title: useRef(""), content: useRef("")}
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleCloseButtonClick = () => {
        display = !display
        onChange(display)
    }
    const handlePostClick = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        await axios.post(`${POST_TEAM_BOARD}/${teamId}`, {
            title: comment.title.current.value,
            content: comment.content.current.value,
            isAnonymous: isAnonymous
        }, {headers})
            .then(() => handleCloseButtonClick())
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    return (
        <WriteBoardContainer isDisplay={display}>
            <div className={'toggle'}>
                <span>게시글 작성</span>
                <div>
                    <ToggleButton isOn={isAnonymous} onClick={() => setIsAnonymous((isAnonymous) => !isAnonymous)}/>
                    <span>익명게시판</span>
                </div>
            </div>
            <Input type='text' placeholder='제목 입력' ref={comment.title}/>
            <Input type='text' placeholder='내용 입력' ref={comment.content}/>
            <div className={'button'}>
                <Button onClick={handlePostClick}>{
                    isLoading ? <Loading/> : '등록'
                }</Button>
                <Button onClick={handleCloseButtonClick}>취소</Button>
            </div>
        </WriteBoardContainer>
    )
}

function Board(props) {
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [board, setBoard] = useState()

    const location = useLocation()
    const teamId = location.pathname.split('/')[2]

    const name = useSelector((state) => state.name)

    const handleButtonClick = () => setIsButtonClicked(!isButtonClicked)

    const buttonStyle = {
        display: isButtonClicked ? 'none' : 'block'
    }
    const getTeamBoard = async () => {
        const headers = functions.getJWT()
        await axios.get(`${GET_TEAM_BOARD}/${teamId}`, {headers})
            .then(res => setBoard(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    useEffect(() => {
        getTeamBoard().then()
    }, []);

    const tab = {
        '자유게시판': board?.freeBoard.map(board => <EachBoard board={board} isAnonymous={false} name={name}
                                                          key={board._id}/>),
        '비밀게시판': board?.anonymousBoard.map(board => <EachBoard board={board} isAnonymous={true} name={name}
                                                               key={board._id}/>)
    }

    return (
        <>
            <TwoTabNav tabStyle={{width: '250px', marginBottom: '20px'}} tab={tab}/>
            <br/>
            <Button style={{width: '120px', ...buttonStyle}} onClick={handleButtonClick}>글 작성</Button>
            <WriteBoard onChange={setIsButtonClicked} display={isButtonClicked} teamId={teamId}/>
        </>
    );
}

export default Board;