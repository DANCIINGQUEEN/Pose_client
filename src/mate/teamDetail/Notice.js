import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Input, ThemeColor, UserBox, UserBoxSize, UserProfile} from "../../UI/UIPackage";
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import {functions} from "../../UI/Functions";
import {POST_TEAM_NOTICE, GET_TEAM_NOTICE} from "../../api";
import axios from "axios";


const NoticeBox = styled.div`
  .notice {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 5px;
    background-color: ${ThemeColor.containerColor};
    margin-bottom:10px;
    border-radius: 16px;

    > :first-child {
      font-weight: bold;
      font-size: 17px;
      margin-left: 20px;
    }

    > :nth-child(2) {
      font-size: 17px;
      margin:0 20px 0 20px;
    }
  }

  .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 25px;
    margin:10px 0 10px 20px;

    > :first-child {
      width: 30px;
    }
    >:nth-child(2){
      font-size: 15px;
      margin-left: 10px;
    }
  }
`

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
                <Button onClick={handlePostClick} style={divStyle.pButton}>등록</Button>
                <Button onClick={handleCloseButtonClick} style={divStyle.dButton}>취소</Button>
            </div>
        </div>
    )
}
const NoticeList = ({teamId}) => {
    const [notices, setNotices] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const getTeamNotice = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        await axios.get(GET_TEAM_NOTICE + '/' + teamId, {headers})
            .then(res => setNotices(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    useEffect(() => {
        getTeamNotice().then()
    }, [])
    console.log(notices)
    return (
        <NoticeBox>
            {notices?.map((notice, index) => {
                return (
                    <div className={'notice'} key={index}>
                        <p>{notice.noticeTitle}</p>
                        <p>{notice.noticeContent}</p>
                        <div className={'author'}>
                            <UserProfile text={notice.author} size={UserBoxSize.small}/>
                            <span>{notice.author}</span>
                        </div>
                    </div>
                )
            })}
        </NoticeBox>
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
        </>);
}

export default Notice;