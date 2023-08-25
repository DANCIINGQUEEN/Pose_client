import React, {useEffect, useRef, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    FeedbackList, CommentsList, ThemeColor, Loading, Container, Box, TwoTabNav
} from "../../UI/UIPackage";
import {POST_TEAM_BOARD, GET_TEAM_BOARD, POST_USER_POST_COMMENT} from "../../api";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import {functions} from "../../UI/Functions";

const BoardBox = styled.div`

`
const CommentList = ({display, onChange, board, userName}) => {
    const comment = useRef("")
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState(board.comments)
    const handleCommentSubmit = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        try {
            await axios.post(POST_USER_POST_COMMENT, {
                userId: board.authorId,
                postId: board._id,
                content: comment.current.value
            }, {headers: headers})
            setComments(comments => [...comments, {user: userName, content: comment.current.value}])
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
        <FeedbackList style={{width: '270px', ...buttonStyle}}>
            {(comments.length === 0) && <p>댓글이 없습니다.</p>}
            {comments?.map((comment, index) => {
                return (
                    <CommentsList key={index}>
                        <div>
                            <UserProfile text={comment.user} size={UserBoxSize.small}/>
                            <span>{comment.user}</span>
                        </div>
                        <span style={{marginLeft: '10px'}}>{comment.content}</span>
                    </CommentsList>
                )
            })
            }
            <Input type="text" placeholder={'댓글을 입력하세요'} style={{width: '250px'}}
                   ref={comment}
            />
            <button onClick={handleCommentSubmit}
                    style={{
                        backgroundColor: !comment ? ThemeColor.disabledButtonColor : ThemeColor.buttonColor,
                        height: '48px'
                    }}>
                {isLoading ? <Loading/> : '등록'}
            </button>
            <br/>
            <button onClick={handleCommentButtonClick}>댓글 창 닫기</button>
        </FeedbackList>
    )
}
const AnonymousCommentList = ({display, onChange, board}) => {
    const comment = useRef("")
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState(board.comments)
    const handleCommentSubmit = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        try {
            await axios.post(POST_USER_POST_COMMENT, {
                userId: board.authorId,
                postId: board._id,
                content: comment.current.value
            }, {headers: headers})
            setComments(comments => [...comments, {content: comment.current.value}])
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
        <FeedbackList style={{width: '270px', ...buttonStyle}}>
            {(comments.length === 0) && <p>댓글이 없습니다.</p>}
            {comments?.map((comment, index) => {
                return (
                    <CommentsList key={index}>
                        <div>
                            <UserProfile text={comment.user} size={UserBoxSize.small}/>
                            <span>{comment.user}</span>
                        </div>
                        <span style={{marginLeft: '10px'}}>{comment.content}</span>
                    </CommentsList>
                )
            })
            }
            <Input type="text" placeholder={'댓글을 입력하세요'} style={{width: '250px'}}
                   ref={comment}
            />
            <button onClick={handleCommentSubmit}
                    style={{
                        backgroundColor: !comment ? ThemeColor.disabledButtonColor : ThemeColor.buttonColor,
                        height: '48px'
                    }}>
                {isLoading ? <Loading/> : '등록'}
            </button>
            <br/>
            <button onClick={handleCommentButtonClick}>댓글 창 닫기</button>
        </FeedbackList>
    )
}
const FreeBoard = ({board, name}) => {
    const [isCommentButtonClick, setIsCommentButtonClick] = useState(false)

    const handleCommentButtonClick = () => {
        setIsCommentButtonClick(isCommentButtonClick => !isCommentButtonClick)
    }
    // console.log(board, 'free')
    return (
        <NoticeBox>
            <main>

                <span className={'title'}>{board.postTitle}</span>
                <div className={'author'}>
                    <UserProfile className={'profileCircle'} text={board.author} size={UserBoxSize.small}/>
                    <span className={'name'}>{board.author}</span>
                </div>
            </main>
            <div className={'section'}>

                <span className={'BoardContent'}>{board.postContent}</span>
                <FeedbackButton className={'comments'} onClick={handleCommentButtonClick}>
                    <FontAwesomeIcon className={'comment'} icon={faComment}/>
                    <span>{board.comments?.length}개</span>
                </FeedbackButton>
            </div>
            <CommentList board={board} display={isCommentButtonClick} userName={name}
                         onChange={() => setIsCommentButtonClick((isCommentButtonClick) => !isCommentButtonClick)}/>

        </NoticeBox>
    )
}

const AnonymousBoard = ({board}) => {
    const [isCommentButtonClick, setIsCommentButtonClick] = useState(false)

    const handleCommentButtonClick = () => {
        setIsCommentButtonClick(isCommentButtonClick => !isCommentButtonClick)
    }
    // console.log(board, 'anonymous')
    return (
        <NoticeBox>
            <span className={'title'} style={{marginTop: '10px'}}>{board.postTitle}</span>
            <div className={'section'} style={{marginTop: '20px'}}>

                <span className={'BoardContent'}>{board.postContent}</span>
                <FeedbackButton className={'comments'} onClick={handleCommentButtonClick}>
                    <FontAwesomeIcon className={'comment'} icon={faComment}/>
                    <span>{board.comments?.length}개</span>
                </FeedbackButton>
            </div>
            <AnonymousCommentList board={board} display={isCommentButtonClick}
                                  onChange={() => setIsCommentButtonClick((isCommentButtonClick) => !isCommentButtonClick)}/>

        </NoticeBox>
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
    span{
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
    const title = useRef("")
    const content = useRef("")
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleCloseButtonClick = () => {
        display = !display
        onChange(display)
    }
    const handlePostClick = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        console.log(title.current.value, content.current.value, isAnonymous)
        await axios.post(POST_TEAM_BOARD + '/' + teamId, {
            title: title.current.value,
            content: content.current.value,
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
            <Input type='text' placeholder='제목 입력' ref={title}/>
            <Input type='text' placeholder='내용 입력' ref={content}/>
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
    const [activeTab, setActiveTab] = useState('posts'); // 초기 값 설정

    const location = useLocation()
    const teamId = location.pathname.split('/')[2]

    const name = useSelector((state) => state.name)

    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked)
    }
    const buttonStyle = {
        display: isButtonClicked ? 'none' : 'block'
    }
    const getTeamBoard = async () => {
        const headers = functions.getJWT()
        await axios.get(GET_TEAM_BOARD + '/' + teamId, {headers})
            .then(res => setBoard(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    useEffect(() => {
        getTeamBoard().then()
    }, []);
    // console.log(board)
    const settings = {
        arrows: false,
        dots: true,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    const tab = {
        '자유게시판': board?.freeBoard.map(board => <FreeBoard board={board} name={name} key={board._id}/>),
        '비밀게시판': board?.anonymousBoard.map(board => <AnonymousBoard board={board} name={name} key={board._id}/>)
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