import React from 'react';
import {UserBox, ThemeColor} from "../../UI/UIPackage";
import {Link} from "react-router-dom";

function HomeRanking(props) {
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: `${ThemeColor.importantColor}`,
        width: "280px",
        padding: '5px 20px 5px 20px',
        borderRadius: '20px',
        margin: '15px 0 15px 0'
    }
    return (
        <div>
            <Link to={'/ranking'} style={{textDecoration: 'none', color: 'black'}}>
                <div>랭킹</div>
            </Link>
            <div>

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