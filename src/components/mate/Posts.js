import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";
import {POST_USER_POST_COMMENT, POST_USER_POST_HEART, GET_IMAGE} from '../../services/api'
import {Container, Input, Loading, ThemeColor, UserBoxSize, UserProfile, Img, PostHeader, PostFeedback, PostContent, FeedbackList, FeedbackButton, CommentsList} from "../UI/UIPackage";
import {functions} from "../UI/Functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from "react-redux";


const CommentList = ({display, onChange, post, userName}) => {
    const comment=useRef("")
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState(post.post.comments)
    const handleCommentSubmit = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        try {
            await axios.post(POST_USER_POST_COMMENT, {
                userId: post._id,
                postId: post.post._id,
                content: comment.current.value
            }, {headers: headers})
            setComments(comments => [...comments, {user:userName, content: comment.current.value}])
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
            // comment.current.value=""

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
                ref={comment}
            />
            <button onClick={handleCommentSubmit}
                    style={{backgroundColor: !comment ? ThemeColor.disabledButtonColor : ThemeColor.buttonColor, height:'48px'}}>
                {isLoading ? <Loading/> : '등록'}
            </button>
            <br/>
            <button onClick={handleCommentButtonClick}>댓글 창 닫기</button>
        </FeedbackList>
    )
}
const Comments = ({comments, handleCommentButtonClick}) => {
    return (
        <FeedbackButton onClick={handleCommentButtonClick}>
            <FontAwesomeIcon className={'comment'} icon={faComment}/>
            <span>{comments?.length}개</span>
        </FeedbackButton>
    )
}


const Likes = ({post, userName}) => {
    const [like, setLike] = useState(post.post.likes)
    const [isLikeButtonClick, setIsLikeButtonClick] = useState(false)
    const [isAlreadyLike, setIsAlreadyLike] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // const name = useSelector((state) => state.name)
    const handleLikeButtonClick = async () => {
        const headers = functions.getJWT()
        setIsLikeButtonClick(isLikeButtonClick => !isLikeButtonClick)
        setIsLoading(true)
        try {
            await axios.post(POST_USER_POST_HEART, {
                userId: post._id,
                postId: post.post._id,
            }, {headers: headers})
            like.includes(userName) ? setLike(like => like.filter((item) => item !== userName)) : setLike(like => [...like, userName])
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (like.includes(userName)) {
            setIsAlreadyLike(true);
            setIsLikeButtonClick(true)
        }
    }, [userName, like])

    return (
        <>
            <FeedbackButton onClick={handleLikeButtonClick}>
                <FontAwesomeIcon
                    className={'heart'}
                    icon={faHeart}
                    style={{color: isLikeButtonClick ? 'red' : 'black'}}/>
                {isLoading ? <Loading/> : <span>{like?.length}개</span>}
            </FeedbackButton>
        </>
    )
}
const Post = ({postTime, imagePath, post}) => {
    const [isCommentButtonClick, setIsCommentButtonClick] = useState(false)
    const name = useSelector((state) => state.name)

    const handleCommentButtonClick = () => {
        setIsCommentButtonClick(isCommentButtonClick => !isCommentButtonClick)
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
                    <Likes post={post} userName={name}/>
                    <Comments comments={post.post.comments} handleCommentButtonClick={handleCommentButtonClick}/>
                </PostFeedback>
                <PostContent>
                    <span>{post.name}&nbsp;&nbsp;</span>
                    <span>{post.post.content}</span>
                </PostContent>
            </div>
            <CommentList post={post} display={isCommentButtonClick} userName={name}
                         onChange={() => setIsCommentButtonClick((isCommentButtonClick) => !isCommentButtonClick)}/>
        </>
    )
}

function Posts({API}) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const getPosts = async () => {
        try {
            setLoading(true)
            const headers = functions.getJWT()
            const response = await axios.get(API, {headers: headers})
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
    const replaceImgUrl = (image) => {
        const replaceUrl = image.replace('public\\', '').replace('public\/', '').replace(/\\/g, '/');
        const basicPath = GET_IMAGE
        return basicPath + replaceUrl;
    }
    const calcPostTime = (postedTime) => {
        const targetDate = new Date(postedTime);
        const currentDate = new Date();
        let postTime
        const timeDifference = Math.floor((currentDate - targetDate) / (1000 * 60 * 60))
        if (timeDifference < 1) {
            const minutesDifference = Math.floor((currentDate - targetDate) / (1000 * 60));
            postTime = `${minutesDifference}분 전`
        } else if (timeDifference < 24) {
            postTime = `${timeDifference}시간 전`
        } else {
            const daysDifference = Math.floor((currentDate - targetDate) / (1000 * 60 * 60 * 24));
            postTime = `${daysDifference}일 전`
        }
        return postTime
    }
    return (
        <Container>
            {loading && <Loading/>}
            {posts.length===0&&<p>게시물이 없습니다</p>}
            {posts?.map((post, index) =>
                (<Post postTime={calcPostTime(post.post.date)} imagePath={replaceImgUrl(post.post.image)} post={post} key={index}/>)
            )}
        </Container>
    );
}

export default Posts;
