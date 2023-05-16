import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function InputToss(props) {
    const [content, setContent] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();
    const handleContentChange = (event) => {
        setContent(event.target.value);
        console.log(content)
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        // event.preventDefault();
        navigate('/input2', {state: {'content':content, 'name':name, 'email':email, 'password':password}})
    }
    return (
        <div>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>

                <input type="text" value={content} onChange={handleContentChange}/>
                <input type="text" value={name} onChange={handleNameChange}/>
                <input type="text" value={email} onChange={handleEmailChange}/>
                <input type="text" value={password} onChange={handlePasswordChange}/>
                <button type='submit'>send</button>
            </form>
        </div>
    );
}

export default InputToss;
