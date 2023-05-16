import React from 'react';
import {useLocation} from "react-router-dom";

function InputToss2(props) {
    const location=useLocation()
    const content=location.state?.content||''
    const name=location.state?.name||''
    const email=location.state?.email||''
    const password=location.state?.password||''
    console.log(location)
    return (
        <>
        <div>전달받은 값</div>
        <p>{content}</p>
        <p>{name}</p>
        <p>{email}</p>
        <p>{password}</p>
        </>
    );
}

export default InputToss2;
