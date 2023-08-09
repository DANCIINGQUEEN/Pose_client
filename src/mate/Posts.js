import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";
import {GET_POSTS, GET_IMAGE} from '../api'
import {Container, getJWT, Loading, UserBoxSize, UserProfile} from "../UI/UIPackage";
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
  width: 230px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 10px 10px;
  .heart, .comment{
    //color:red;
    font-size: 20px;
  }
  span{
    font-size: 15px;
  }
  
`
const PostContent = styled.div`
  >:first-child {
    font-weight: bold;
    font-size: 17px;

}
  
`

const Comments = ({comments}) => {

    return (
        <span>댓글 {comments?.length}개</span>
    )

}
const Likes = ({likes}) => {
    return (
        <span>좋아요 {likes?.length}개</span>
    )
}

function Posts(props) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const getPosts = async () => {
        try {
            setLoading(true)
            const headers = getJWT()
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
                    const image2 = post.post.image.replace(/\\/g, '/');
                    const urlPath='https://competitive-leticia-danciingqueen.koyeb.app/'
                    const imagePath = urlPath+ image;
                console.log(imagePath)

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
                        <div key={index} style={{marginTop: '30px'}}>
                            <PostHeader>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <UserProfile text={post.name} size={UserBoxSize.medium}/>
                                    <p>&nbsp;&nbsp;{post.name}</p>
                                </div>
                                <span>{postTime}</span>
                            </PostHeader>
                            <Img src={imagePath} alt=""/>
                            <PostFeedback>
                                <FontAwesomeIcon className={'heart'} icon={faHeart}/>
                                <FontAwesomeIcon className={'comment'} icon={faComment}/>

                                <Likes likes={post.post.likes}/>
                                <Comments comments={post.post.comments}/>
                            </PostFeedback>
                            <PostContent>
                                <span>{post.name}&nbsp;&nbsp;</span>
                                <span>{post.post.content}</span>
                            </PostContent>
                        </div>
                    )
                }
            )
            }
        </Container>
    );
}

export default Posts;
