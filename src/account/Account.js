import React from 'react';
import {Container, NavigationBar} from "../UI/UIPackage";
import {useDispatch, useSelector} from "react-redux";
import {UserBox} from "../UI/UIPackage";
import {logout} from "../state/userState";
import {Link} from "react-router-dom";

function Account(props) {
    const dispatch = useDispatch();
    const name = useSelector((state) => state.name)
    const email = useSelector((state) => state.email)
    const age = useSelector((state) => state.age)
    const weight = useSelector((state) => state.weight)
    const height = useSelector((state) => state.height)
    const exercise = useSelector((state) => state.exercise)
    const wishList = useSelector((state) => state.wishList)

    async function setLogout() {
        // Remove the JWT token from the session storage
        sessionStorage.removeItem('jwt');
        dispatch(
            logout()
        )
    }

    return (
        <Container>
            <h1>유저 정보</h1>
            <div style={{
                border: '1px solid black',
                borderRadius: '20px',
                backgroundColor: 'lightslategray',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 10px 10px 10px'
            }}>

                {name &&
                    <UserBox name={name} email={email}/>
                }

                <p>나이 : {age}</p>
                <p>몸무게 : {weight}</p>
                <p>키 : {height}</p>
                <p>주로 하는 운동 : {exercise}</p>
                <p>해결하고싶은 고민</p>
                <p>
                    {
                        wishList.map((item, index) => {
                            return (
                                <span key={index}>{item}</span>
                            )
                        })
                    }
                </p>
            </div>
            <button onClick={setLogout}>
                <Link to={'/'}>
                로그아웃
                </Link>
            </button>

            <NavigationBar/>


        </Container>
    );
}

export default Account;
