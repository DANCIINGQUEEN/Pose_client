import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


import {GET_USER_FULL_INFO} from '../api'


import {getUserFullInfo, logout} from "../state/userState";

import {Container, UserBox, NavigationBar, UserBoxSize} from '../UI/UIPackage';

import CurrentExercise from "./widget/CurrentExercise";
import HomeRanking from "./widget/HomeRanking";
import StateOfMate from "./widget/StateOfMate";


function Home(props) {
    const [isLoading, setIsLoading] = useState(false)
    const isAuth = Boolean(useSelector((state) => state.token))
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const name = useSelector((state) => state.name)
    const email = useSelector((state) => state.email)


    const getUserInfo = () => {
        const jwt = sessionStorage.getItem('jwt')
        const headers = {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
        setIsLoading(true)
        // console.log(isLoading)
        axios.get(GET_USER_FULL_INFO, {
            headers: headers
        }).then(response => {
            dispatch(
                getUserFullInfo({
                    name: response.data.name,
                    email: response.data.email,
                    age: response.data.age,
                    weight: response.data.weight,
                    height: response.data.height,
                    exercise: response.data.exercise,
                    wishList: response.data.wishList,
                    follower: response.data.follower,
                    following: response.data.following
                })
            )
            // console.log(response.data)
            setIsLoading(false)
            // console.log(isLoading)
        }).catch(error => console.error(error))
    }

    const handleMenuClick = () => {
        navigate('/menu')
    }

    useEffect(() => {
        getUserInfo()
    }, [name])

    async function setLogout() {
        // Remove the JWT token from the session storage
        sessionStorage.removeItem('jwt');
        dispatch(
            logout()
        )
    }


    return (
        <Container>

            <h1>운동 메이트</h1>
            <h3>3월 24일 까지</h3>
            <div>8일 12시간 : 33분 : 42초 남음</div>
            <br/>
            <br/>

            {name &&
                <Link to={'/account'} style={{textDecoration: 'none', color:'black'}}>
                    <div>
                        <UserBox name={name} email={email} size={UserBoxSize.large}/>
                    </div>
                </Link>
            }
            <br/>
            <br/>
            {/*<StatusOfMAtes/>*/}
            <div>
                <StateOfMate/>
            </div>
            <br/>
            <br/>
            <CurrentExercise/>
            <br/>
            <br/>
            <HomeRanking/>
            <br/>
            <br/>
            <NavigationBar/>

        </Container>
    );
}

export default Home;
//운동, 랭킹, 커뮤니티, 메이트, 계정