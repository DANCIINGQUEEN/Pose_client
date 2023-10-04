import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";
import {
    POST_USER_POST_COMMENT,
    POST_USER_POST_HEART,
    DELETE_MY_POST,
    GET_IMAGE,
    UPDATE_MY_POST,
    DELETE_USER_POST_COMMENT
} from '../../services/api'
import {
    Container,
    Input,
    Loading,
    ThemeColor,
    UserBoxSize,
    UserProfile,
    Img,
    PostHeader,
    PostFeedback,
    PostContent,
    FeedbackList,
    FeedbackButton,
    CommentsList,
    Button, ModalWrapper, UserBox, CommentInput
} from "../UI/UIPackage";
import {functions} from "../../utils/Functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faEllipsisVertical, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";


const DeleteComment = ({post, commentId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsUpdateButtonClicked(false)
    }
    const buttonStyle = {display: isUpdateButtonClicked ? 'none' : 'block'}


    const deleteComment = async () => {
        const userId = post._id
        const postId = post.post._id
        console.log(userId, postId, commentId)
        const headers = functions.getJWT()
        await axios.delete(`${DELETE_USER_POST_COMMENT}/${userId}/${postId}/${commentId}`, {headers: headers})
            .catch(e => console.log(e))
            .finally(() => {
                setIsLoading(false)
                closeModal()
            })
    }
    return (
        <ModalWrapper>
            <button className="ellipse" onClick={openModal}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
            {isModalOpen && (
                <div className="modal">
                    <div>
                        <Button style={buttonStyle} onClick={deleteComment}>{isLoading ? <Loading/> : '댓글 삭제'}</Button>
                    </div>
                    <button id={'close'} onClick={closeModal}>닫기</button>

                </div>
            )}

        </ModalWrapper>
    )
}
const CommentList = ({display, onChange, post, userName}) => {
    const comment = useRef("")
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState(post.post.comments)

    const id = useSelector((state) => state._id)
    const handleCommentSubmit = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        try {
            await axios.post(POST_USER_POST_COMMENT, {
                userId: post._id,
                postId: post.post._id,
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
    // console.table(comments)
    return (
        <FeedbackList style={buttonStyle}>
            {(comments.length === 0) && <p>댓글이 없습니다.</p>}
            {comments?.map((comment, index) => {
                return (
                    <CommentsList key={index}>
                        <div className='postComment'>
                            <div className='eachComment'>
                                <UserBox name={comment.user} size={UserBoxSize.small}/>
                                <span id='comment'>{comment.content}</span>
                            </div>
                            {comment.userId === id && <DeleteComment post={post} commentId={comment._id}/>}
                        </div>
                    </CommentsList>
                )
            })}
            <CommentInput>
                <Input type="text" placeholder={'댓글을 입력하세요'} ref={comment}/>
                <button onClick={handleCommentSubmit}>
                    {isLoading ? <Loading/> : <FontAwesomeIcon icon={faArrowUp}/>}
                </button>
            </CommentInput>
            <button className='close' onClick={handleCommentButtonClick}>닫기</button>
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
const StyledSpan = styled.span`margin: 5px 180px 5px 2px;`;

const UpdatePost = ({post, closeModal, setIsUpdateButtonClicked}) => {
    const [newContent, setNewContent] = useState("")
    const handlePostChange = e => setNewContent(e.target.value)
    console.log(post)

    const updatePost = async () => {
        const headers = functions.getJWT()
        const postId = post.post._id
        let content = newContent
        if (!content) content = post.post.content

        console.log()
        await axios.put(`${UPDATE_MY_POST}/${postId}`,
            {content},
            {headers})
            .catch(e => console.error(e))
            .finally(() => {
                setIsUpdateButtonClicked(false)
                closeModal()
            })
    }
    return (
        <>
            <h4>게시글 수정</h4>
            <StyledSpan>글 수정</StyledSpan>
            <Input type='text' name='text' defaultValue={post.post.content} onChange={handlePostChange}/>
            <div>
                <Button onClick={updatePost}>저장</Button>
                <Button onClick={() => setIsUpdateButtonClicked(false)}>취소</Button>
            </div>
        </>
    )
}
const UpdateAndDelete = ({post}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsUpdateButtonClicked(false)
    }

    const deletePost = async () => {
        const headers = functions.getJWT()
        setIsLoading(true)

        await axios.delete(`${DELETE_MY_POST}/${post.post._id}`, {headers: headers})
            .catch(e => console.error(e))
            .finally(() => {
                setIsLoading(false)
                closeModal()
            })
    }
    const buttonStyle = {display: isUpdateButtonClicked ? 'none' : 'block'}

    return (
        <ModalWrapper>
            <button onClick={openModal} className={'ellipse'}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
            {isModalOpen && (
                <div className={'modal'}>
                    <div>
                        <Button onClick={() => setIsUpdateButtonClicked(true)} style={buttonStyle}>수정</Button>
                        <Button onClick={deletePost} style={buttonStyle}>
                            {isLoading ? <Loading/> : '삭제'}
                        </Button>
                    </div>
                    {isUpdateButtonClicked && <UpdatePost post={post} closeModal={closeModal}
                                                          setIsUpdateButtonClicked={setIsUpdateButtonClicked}/>}
                    <button id={'close'} onClick={closeModal}>닫기</button>
                </div>
            )}
        </ModalWrapper>
    )
}
const Post = ({postTime, imagePath, post}) => {
    const [isCommentButtonClick, setIsCommentButtonClick] = useState(false)
    const name = useSelector((state) => state.name)
    const id = useSelector((state) => state._id)
    const handleCommentButtonClick = () => {
        setIsCommentButtonClick(isCommentButtonClick => !isCommentButtonClick)
    }

    return (
        <>
            <div style={{marginTop: '30px'}}>
                <PostHeader>
                    <UserBox name={post.name} size={UserBoxSize.medium}/>
                    {id === post._id && <UpdateAndDelete post={post}/>}
                </PostHeader>
                <Img src={imagePath} alt=""/>
                <PostFeedback>
                    <div id={'feedback'}>
                        <Likes post={post} userName={name}/>
                        <Comments comments={post.post.comments} handleCommentButtonClick={handleCommentButtonClick}/>
                    </div>
                    <span id={'time'}>{postTime}</span>
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
    // console.table(posts)
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
            {posts.length === 0 && <p>게시물이 없습니다</p>}
            {posts?.map((post, index) =>
                (<Post postTime={calcPostTime(post.post.date)} imagePath={replaceImgUrl(post.post.image)} post={post}
                       key={index}/>)
            )}
        </Container>
    );
}

export default Posts;
