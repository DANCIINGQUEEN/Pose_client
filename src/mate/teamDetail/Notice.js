import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Input, Loading, NoticeBox, UserBox, UserBoxSize, UserProfile} from "../../UI/UIPackage";
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import {functions} from "../../UI/Functions";
import {POST_TEAM_NOTICE, GET_TEAM_NOTICE} from "../../api";
import axios from "axios";


const WriteNotice = ({display, onChange, teamId}) => {
    const title = useRef("")
    const content = useRef("")
    const [isLoading, setIsLoading] = useState(false)

    const divStyle = {
        display: display ? 'block' : 'none',
        width: '310px',
        dButton: {
            width: '110px'
        },
        pButton: {
            width: '110px',
            // backgroundColor:(title.current.length===0)?
            // ThemeColor.disabledButtonColor:ThemeColor.buttonColor
        },
        div: {
            display: 'flex',
            width: '300px',
            justifyContent: 'space-evenly',

        }
    }
    const handlePostClick = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        console.log(title.current.value, content.current.value)
        await axios.post(POST_TEAM_NOTICE + '/' + teamId, {
            title: title.current.value,
            content: content.current.value
        }, {headers})
            .then(() => handleCloseButtonClick())
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))

    }
    const handleCloseButtonClick = () => {
        display = !display
        onChange(display)
    }
    return (
        <div style={divStyle}>
            <h4>공지 작성</h4>
            <Input type='text' placeholder='제목 입력' ref={title}/>
            <Input type='text' placeholder='내용 입력' ref={content}/>
            <div style={divStyle.div}>
                <Button onClick={handlePostClick} style={divStyle.pButton}>
                    {isLoading ? <Loading/> : '등록'}
                </Button>
                <Button onClick={handleCloseButtonClick} style={divStyle.dButton}>취소</Button>
            </div>
        </div>
    )
}
const NoticeList = ({teamId}) => {
    const [notices, setNotices] = useState()
    const getTeamNotice = async () => {
        const headers = functions.getJWT()
        await axios.get(GET_TEAM_NOTICE + '/' + teamId, {headers})
            .then(res => setNotices(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getTeamNotice().then()
    }, [])
    console.log(notices)
    return (
        <>
            {notices?.map((notice, index) => {
                return (
                    <NoticeBox key={notice._id}>
                        <main>

                        <span className={'title'}>{notice.noticeTitle}</span>
                        <div className={'author'}>
                            <UserProfile  className={'profileCircle'} text={notice.author} size={UserBoxSize.small}/>
                            <span className={'name'} >{notice.author}</span>
                        </div>
                        </main>
                        <p className={'content'}>{notice.noticeContent}</p>

                    </NoticeBox>
                )
            })}
        </>
    )

}

function Notice(props) {
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const location = useLocation()
    const teamId = location.pathname.split('/')[2]


    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked)
    }
    const buttonStyle = {
        display: isButtonClicked ? 'none' : 'block'
    }

    return (
        <>
            <h2 style={{marginLeft:'-240px'}}>공지</h2>
            <NoticeList teamId={teamId}/>
            <br/>
            <Button style={{width: '120px', ...buttonStyle}} onClick={handleButtonClick}>글 작성</Button>
            <WriteNotice onChange={setIsButtonClicked} display={isButtonClicked} teamId={teamId}/>
            <br/>
        </>
    );
}

export default Notice;