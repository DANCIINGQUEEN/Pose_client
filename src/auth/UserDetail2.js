import React from 'react';
import {Container, Input, Button} from '../UI/UIPackage';
import {useNavigate} from "react-router-dom";

function UserDetail2(props) {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/userdetail3');
    };
    return (
        <Container>
            <h2 style={{marginBottom:'-10px'}}>주로 어떤 운동을 하시나요?</h2>
            <h5>하시는 운동에 맞게 추천해드릴게요</h5>
            <Button onClick={handleButtonClick}>헬스</Button>
            <br/>
            <Button onClick={handleButtonClick}>홈 트레이닝</Button>
        </Container>
    );
}

export default UserDetail2;