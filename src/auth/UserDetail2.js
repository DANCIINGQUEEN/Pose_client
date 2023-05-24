import React from 'react';
import {Container, Input, Button} from '../UI/UIPackage';
import {useLocation, useNavigate} from "react-router-dom";

function UserDetail2(props) {
    const navigate = useNavigate();

    const location = useLocation()
    console.log(location.state)
    const name = location.state?.name || ''
    const email = location.state?.email || ''
    const password = location.state?.password || ''
    const sex = location.state?.sex || ''
    const area = location.state?.area || ''
    const height = location.state?.height || ''
    const weight = location.state?.weight || ''
    const age = location.state?.age || ''
    const handleHealthButtonClick = () => {
        navigate('/userdetail3', {state:{
            ...location.state,
            exercise: '헬스'
            }});
    };
    const handleHomeButtonClick = () => {
        navigate('/userdetail3', {state:{
            ...location.state,
            exercise: '홈 트레이닝'
            }});
    }
    return (
        <Container>
            <h2>주로 어떤 운동을 하시나요?</h2>
            <h3 style={{margin:'0 0 -10px 0'}}>{name}님!</h3>
            <h5>하시는 운동에 맞게 추천해드릴게요</h5>

            {/*<p>{name}</p>*/}
            {/*<p>{email}</p>*/}
            {/*<p>{password}</p>*/}
            {/*<p>{sex}</p>*/}
            {/*<p>{area}</p>*/}
            {/*<p>{height}</p>*/}
            {/*<p>{weight}</p>*/}
            {/*<p>{age}</p>*/}
            <div style={{display:'flex', flexDirection:'column',justifyContent:'center', width:'90%'}}>
            <Button onClick={handleHealthButtonClick}>헬스</Button>
            <br/>
            <Button onClick={handleHomeButtonClick}>홈 트레이닝</Button>
            </div>
        </Container>
    );
}

export default UserDetail2;