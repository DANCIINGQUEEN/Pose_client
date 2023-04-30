import React from 'react';
import {UserBox} from "../../UI/UIPackage";

function Ranking(props) {
    return (
        <div>
            <div>랭킹</div>
            <div style={{width:'150px', }}>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>1st</h3>
                    <UserBox name='qwer' email='asdf'/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>2nd</h3>
                    <UserBox name='qwer' email='asdf'/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>3rd</h3>
                    <UserBox name='qwer' email='asdf'/>
                </div>
            </div>

        </div>
    );
}

export default Ranking;