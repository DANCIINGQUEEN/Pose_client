import React from 'react';
import {UserBox} from "../../UI/UIPackage";

function HomeRanking(props) {
    const style={
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor:'#d9d9d9',
        width:"250px",
        padding:'5px 20px 5px 20px',
        borderRadius:'20px',
        margin:'15px 0 15px 0'
    }
    return (
        <div>
            <div>랭킹</div>
            <div >

                <div style={style}>
                    <UserBox name='qwer' email='asdf'/>
                    <h3>1st</h3>
                </div>
                <div style={style}>
                    <UserBox name='qwer' email='asdf'/>
                    <h3>2nd</h3>
                </div>
                <div style={style}>
                    <UserBox name='qwer' email='asdf'/>
                    <h3>3rd</h3>
                </div>
            </div>

        </div>
    );
}

export default HomeRanking;