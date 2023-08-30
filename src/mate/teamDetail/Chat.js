import React, {useEffect, useRef, useState} from 'react';
import {Container, UserBox, UserProfile} from "../../UI/UIPackage";
import io from 'socket.io-client';
import {CHATTING} from "../../api";
import {useSelector} from "react-redux";

const Chat=()=>{
    const [messages, setMessages] = useState([]);

    const socket = useRef(null)
    const inputRef = useRef()
    const chatBoxRef = useRef(null);

    const name=useSelector(state=>state.name)
    const ENDPOINT = 'localhost:3001'
    socket.current = io(ENDPOINT ,{
        path:'/chat',
    })
    useEffect(() => {
        socket.current.on('chat message', (msg) => {
            // console.log(msg)
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
        inputRef.current.focus()
        return () => {
            socket.current.off("chat message")
        }


    }, [])

    // useEffect(()=>{
    //     chatBoxRef.current.scrollIntoView({behavior:'smooth'})
    // }, [messages])
    //

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage=inputRef.current.value
        console.log(newMessage)
        const msg = {name, newMessage}
        socket.current.emit('chat message', {msg});
        inputRef.current.value = ''
    };
    return(
        <>
            {
                messages.map((msg, index) => (
                    <>
                    <span>{msg.msg.name}</span>
                    <span>{msg.msg.newMessage}</span>
                    </>))
            }
            <form onSubmit={handleSubmit}>

        <input
            type="text"
            ref={inputRef}/>
                <button type="submit">send</button>
            </form>
        </>
    )
}
export default Chat;