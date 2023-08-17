import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";
import {GET_POSTS, POST_USER_POST_COMMENT, MATE} from '../api'
import {Container, Input, Loading, Modal, ThemeColor, UserBoxSize, UserProfile} from "../UI/UIPackage";
import {functions} from "../UI/Functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart} from '@fortawesome/free-solid-svg-icons';

const Img = styled.img`
  width: 340px;
  height: 340px;
  object-fit: cover;
  border-radius: 16px;
`
const PostHeader = styled.div`
  width: 330px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 18px;
    font-weight: bold;
  }
`
const PostFeedback = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 10px 10px;

  .heart, .comment {
    font-size: 20px;
  }

  span {
    font-size: 15px;
  }

`
const PostContent = styled.div`
  > :first-child {
    font-weight: bold;
    font-size: 17px;
  }
`
const FeedbackButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 70px;
  display: flex;
  justify-content: space-between;
`
const FeedbackList = styled.div`
  width: 300px;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  background-color: ${ThemeColor.divColor};

  button:nth-of-type(1) {
    border: none;
    margin-left: 10px;
    border-radius: 10px;
    height: 40px;
  }

  button:nth-of-type(2) {
    border: none;
  }
`
const CommentsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;

  > :nth-child(1) {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 10px;

    > :nth-child(1) {
      margin-right: 10px;
    }

    > :nth-child(2) {
      font-size: 15px;
      font-weight: bold;
    }
  }

  > :nth-child(2) {
    margin-left: 8px;
  }
`

const CommentList = ({comments, display, onChange, post}) => {
    const [comment, setComment] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    console.log({userId:post._id, postId:post.post._id, content:post.post.content})

    const handleCommentSubmit = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        try {
            await axios.post(POST_USER_POST_COMMENT, {
                userId: post._id,
                postId: post.post._id,
                content: comment
            }, {headers: headers})
            setComment("");
            window.location.reload();
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
        <FeedbackList style={buttonStyle}>
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
                   onChange={(e) => setComment(e.target.value)}/>
            <button onClick={handleCommentSubmit} disabled={!comment}
                    style={{backgroundColor: !comment ? ThemeColor.disabledButtonColor : ThemeColor.buttonColor}}>
                {isLoading ? <Loading/> : '등록'}
            </button>
            <br/>
            <button onClick={handleCommentButtonClick}>댓글 창 닫기</button>
        </FeedbackList>
    )
}
const Comments = ({comments}) => {
    return (
        <>
            <FontAwesomeIcon className={'comment'} icon={faComment}/>
            <span>{comments?.length}개</span>
        </>
    )
}

const LikeList=()=>{

}
const Likes = ({likes, clicked}) => {


    return (
        <>
            <FontAwesomeIcon className={'heart'} icon={faHeart} style={{color:clicked?'red':'black'}}/>
            <span>{likes?.length}개</span>
        </>
    )
}
const Post = ({postTime, imagePath, post}) => {
    const [isCommentButtonClick, setIsCommentButtonClick] = useState(false)
    const [isLikeButtonClick, setIsLikeButtonClick] = useState(false)

    const handleCommentButtonClick = () => {
        setIsCommentButtonClick(isCommentButtonClick => !isCommentButtonClick)
    }
    const handleLikeButtonClick = () => {
        setIsLikeButtonClick(isLikeButtonClick => !isLikeButtonClick)
    }
    return (
        <>
            <div style={{marginTop: '30px'}}>
                <PostHeader>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <UserProfile text={post.name} size={UserBoxSize.medium}/>
                        <p>&nbsp;&nbsp;{post.name}</p>
                    </div>
                    <span>{postTime}</span>
                </PostHeader>
                <Img src={imagePath} alt=""/>
                <PostFeedback>
                    <FeedbackButton onClick={handleLikeButtonClick}>
                        <Likes likes={post.post.likes} clicked={isLikeButtonClick}/>
                    </FeedbackButton>
                    <FeedbackButton onClick={handleCommentButtonClick}>
                        <Comments comments={post.post.comments}/>
                    </FeedbackButton>


                </PostFeedback>
                <PostContent>
                    <span>{post.name}&nbsp;&nbsp;</span>
                    <span>{post.post.content}</span>
                </PostContent>
            </div>
            <CommentList comments={post.post.comments} post={post} display={isCommentButtonClick}
                         onChange={() => setIsCommentButtonClick((isCommentButtonClick) => !isCommentButtonClick)}/>
        </>
    )
}

function Posts(props) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const getPosts = async () => {
        try {
            setLoading(true)
            const headers = functions.getJWT()
            const response = await axios.get(GET_POSTS, {headers: headers})
            setPosts(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getPosts().then()

    }, [])
    // console.log(posts)
    return (
        <Container>
            {loading && <Loading/>}
            {posts?.map((post, index) => {
                    const image = post.post.image.replace('public\\', '').replace(/\\/g, '/');
                // console.log(post.post.image)
                    const image2 = image.replace('public\\', '').replace(/\\/g, '/');
                // console.log(image2)
                    const urlPath = 'https://competitive-leticia-danciingqueen.koyeb.app/'
                    const imagePath = urlPath + image2;
                // console.log(imagePath)

                    const targetDate = new Date(post.post.date);
                    const currentDate = new Date();
                    let postTime

                    const timeDifference = Math.floor((currentDate - targetDate) / (1000 * 60 * 60)); // 차이를 시간으로 변환

                    if (timeDifference < 1) {
                        const minutesDifference = Math.floor((currentDate - targetDate) / (1000 * 60));
                        postTime = `${minutesDifference}분 전`
                    } else if (timeDifference < 24) {
                        postTime = `${timeDifference}시간 전`
                    } else {
                        const daysDifference = Math.floor((currentDate - targetDate) / (1000 * 60 * 60 * 24));
                        postTime = `${daysDifference}일 전`
                    }
                    return (
                        <Post postTime={postTime} imagePath={imagePath} post={post} key={index}/>
                    )
                }
            )
            }
        </Container>
    );
}

export default Posts;
