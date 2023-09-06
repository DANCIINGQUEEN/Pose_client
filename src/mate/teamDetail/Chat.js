import React, {useEffect, useRef, useState} from 'react';
import {Container, ThemeColor, UserBox, UserProfile} from "../../UI/UIPackage";
import io from 'socket.io-client';
import {CHATTING} from "../../api";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import styled from "styled-components";


const MessageInput=styled.div`
  position: fixed;
  bottom: 0;
  left: 100px;
  display:flex;
  flex-direction: row;
  //border:1px solid black;
  
  input{
    position: relative;
    width: 300px;
    height: 50px;
    border-radius: 10px;
    padding: 0 15px;
    margin-bottom:20px;
    left:20px;
    z-index: 1;
    
  }
  button{
    position: relative;
    border:none;
    background-color:${ThemeColor.disabledButtonColor};
    width:40px;
    height:40px;
    border-radius:50%;
    right:30px;
    top:7px;
    z-index: 2;
    &:hover{
      background-color: ${ThemeColor.buttonColor};
    }
  }
`
const SendMessage = ({socket, room, setMessages}) => {
    const message = useRef(null)
    const name = useSelector(state => state.name)
    const id = useSelector(state => state._id)
    const sendMessage = (e) => {
        // e.preventDefault()
        const messageContent = message.current.value
        socket.current.emit("send_message", {messageContent, room, name, id});
        setMessages((prevMessages) => [...prevMessages, {messageContent, room, name, id}]);
        message.current.value = ''
        message.current.focus()
    };

    return (
        <MessageInput>
            <input
                placeholder="메시지 입력..."
                type='text'
                ref={message}
            />
            <button onClick={sendMessage}>↑</button>

        </MessageInput>
    )
}
const OtherMessage = styled.div`
  list-style-type: none;
  text-align: left;
  flex-direction: column;
  margin-left:20px;
  height:70px;
  div{
    display: flex;
    flex-direction: row;
    >:first-child{
        margin-right: 5px;
    }
  }
  .msg{
    background-color: ${ThemeColor.containerColor};
    max-width: 200px;
    align-self: flex-start;
    padding: 10px;
    margin-left: 20px;
    border-radius: 16px;
  }
`
const MyMessage = styled.span`
  align-self: flex-end;
  background-color: ${ThemeColor.containerColor};
  max-width: 200px;
  list-style-type: none;
  padding: 10px;
  margin-bottom: 10px;
  margin-right:20px;
  border-radius: 16px;

`

const Messages = ({messages}) => {
    const myId = useSelector(state => state._id)

    return (
        <div style={{
            display: 'flex',
            // display: 'block',
            flexDirection: 'column',
            minHeight:'600px',
            width:'340px',
            paddingBottom:'80px'

        }}>
            {messages.map((msg, index) =>
                <>
                    {myId === msg.id ? (
                        <MyMessage>{msg.messageContent}</MyMessage>
                    ) : (
                        <OtherMessage>
                            <div>
                                <UserProfile text={msg.name} size={25}/>
                                <span>{msg.name}</span>
                            </div>
                            <span className={'msg'}>{msg.messageContent}</span>
                        </OtherMessage>
                    )}
                </>
            )
            }
        </div>
    )
}
const Chat = () => {
    const location = useLocation()
    const room = location.pathname.split('/')[2]
    const [messages, setMessages] = useState([]);
    const socket = useRef(null)
    const chatBoxRef = useRef(null);

    useEffect(() => {
        socket.current = io.connect(CHATTING, {path: '/chat'});
        if (room !== "") {
            socket.current.emit("join_room", room);
        }
        socket.current.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        return () => {
            socket.current.off("receive_message")
        }
    }, []);
    useEffect(()=>{
        chatBoxRef.current.scrollIntoView({behavior:'smooth'})
    }, [messages])
    return (
        <div>
            <Messages messages={messages}/>

            <SendMessage socket={socket} room={room} setMessages={setMessages}/>
            <div ref={chatBoxRef}/>

        </div>
    )
}
export default Chat;