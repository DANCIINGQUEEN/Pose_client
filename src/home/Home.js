import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {GET_USER_INFO} from '../api'


import {getUser, logout} from "../state/userState";
import {Container, UserBox, NavigationBar} from '../UI/UIPackage';
import StatusOfMAtes from "./widget/StatusOfMAtes";
import CurrentExercise from "./widget/CurrentExercise";
import Ranking from "./widget/Ranking";


function Home(props) {
    const [isLoading, setIsLoading] = useState(false)
    const isAuth = Boolean(useSelector((state) => state.token))
    const dispatch = useDispatch();

    const name = useSelector((state) => state.name)
    const email = useSelector((state) => state.email)

    async function setLogout() {
        // Remove the JWT token from the session storage
        sessionStorage.removeItem('jwt');
        dispatch(
            logout()
        )
    }

    const getUserInfo = () => {
        const jwt = sessionStorage.getItem('jwt')
        const headers = {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
        setIsLoading(true)
        console.log(isLoading)
        axios.get(GET_USER_INFO, {
            headers: headers
        }).then(response => {
            dispatch(
                getUser({
                    name: response.data.name,
                    email: response.data.email
                })
            )
            setIsLoading(false)
            console.log(isLoading)
        }).catch(error => console.error(error))
    }

    useEffect(() => {
        getUserInfo()
    }, [name])


    return (
        <Container>
            <div>3월 24일 까지</div>
            <div>8일 12시간 : 33분 : 42초 남음</div>
            <br/>
            <button onClick={setLogout}>로그아웃</button>
            {name &&
                <UserBox name={name} email={email}/>
            }
            <StatusOfMAtes/>
            <CurrentExercise/>
            <Ranking/>
            <NavigationBar/>

        </Container>
    );
}

export default Home;
//운동, 랭킹, 커뮤니티, 메이트, 계정