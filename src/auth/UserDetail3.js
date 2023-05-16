import React, { useState } from 'react';
import {Container, Input, Button} from '../UI/UIPackage';
import {useLocation, useNavigate} from "react-router-dom";


const ButtonGroup = ({ buttons }) => {
    const [selectedButtons, setSelectedButtons] = useState([]);


    const location = useLocation()
    console.log(location.state)


    const handleButtonClick = (button) => {
        if (selectedButtons.includes(button)) {
            setSelectedButtons(selectedButtons.filter((b) => b !== button));
        } else {
            setSelectedButtons([...selectedButtons, button]);
        }
    };
    return (
        <div>
            {buttons.map((button) => (
                <button
                    key={button}
                    onClick={() => handleButtonClick(button)}
                    style={{
                        backgroundColor: selectedButtons.includes(button) ? "rgba(97, 137, 239, 1)" : "gray",
                        color: "white",
                        height:'40px',
                        padding: "0 10px",
                        borderRadius: "20px",
                        margin: "5px",
                        // outline: "none",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};
function UserDetail3(props) {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/');
    };

    const wishList=['평생 숙제 다이어트', '뱃살, 옆구리살 빼기', '마른 몸 벗어나기', '탄탄한 몸 만들기', '넓은 어깨 갖기', '슬림한 하체 만들기', '벌크업 하기', '굵코 큰 팔 만들기', '힙업','팔뚝 군살 제거', '전체적인 근육량 증가', '선명한 복근 만들기', '굵은 하체 만들기']

    return (
        <Container>
            <h2 style={{marginBottom:'-10px'}}>해결하고 싶은 고민이 무엇인가요?</h2>
            <h5>선택해주신 고민들을 기반으로 운동을 추천합니다</h5>
            <ButtonGroup buttons={wishList}/>
            <br/>
            <Button onClick={handleButtonClick}>완료</Button>
        </Container>
    );
}

export default UserDetail3;