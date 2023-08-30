import {UserProfile} from "./UserProfile";
import React from "react";

export const UserBox = ({name, email, size}) => {
    const fontSize = (3 * size) / 5
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <UserProfile text={name} size={size}/>
            <div style={{textAlign: 'left', marginLeft: '10px'}}>
                {name!==''&& <div style={{fontSize: fontSize}}>{name}</div>}
                {email!==''&& <div style={{fontSize: fontSize}}>{email}</div>}
            </div>
        </div>
    )
}