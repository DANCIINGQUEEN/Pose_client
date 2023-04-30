import React, {useState} from 'react';
import {Container, UserBox, Carousel, RecBox, SquareBox, NavigationBar} from '../UI/UIPackage';
import StatusOfMAtes from "./widget/StatusOfMAtes";
import CurrentExercise from "./widget/CurrentExercise";
import Ranking from "./widget/Ranking";



function Home(props) {
    const name='박지웅'
    const email='qwer1234@gmail.com'

    return (
        <Container>
            <div>3월 24일 까지</div>
            <div>8일 12시간 : 33분 : 42초 남음</div>
            <br/>
            <UserBox name={name} email={email}/>
            <StatusOfMAtes/>
            <CurrentExercise/>
            <Ranking/>
            <NavigationBar/>

        </Container>
    );
}

export default Home;
//운동, 랭킹, 커뮤니티, 메이트, 계정