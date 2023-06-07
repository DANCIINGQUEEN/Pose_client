import React, {useState} from 'react';
import {ThemeColor, Container, Input, Button} from '../UI/UIPackage';
import {useLocation, useNavigate} from "react-router-dom";

import {REGISTER} from '../api'
import axios from "axios";
import Like from "../prtc/Like";

const ButtonGroup = ({buttons, onChange}) => {
    const [selectedButtons, setSelectedButtons] = useState([]);

    const handleButtonClick = (button) => {
        let updatedButtons
        if (selectedButtons.includes(button)) {
            updatedButtons = selectedButtons.filter((b) => b !== button)
        } else {
            updatedButtons = [...selectedButtons, button]
        }
        setSelectedButtons(updatedButtons)
        // console.log(updatedButtons)
        onChange(updatedButtons)
    }
    return (
        <div>
            {buttons.map((button) => (
                <button
                    key={button}
                    onClick={() => handleButtonClick(button)}
                    style={{
                        backgroundColor: selectedButtons.includes(button) ? `${ThemeColor.buttonColor}` : `${ThemeColor.primaryColor}`,
                        color: selectedButtons.includes(button) ? 'black' : 'white',
                        height: '40px',
                        padding: "0 17px 0 17px",
                        textAlign:'center',
                        borderRadius: "16px",
                        margin: "5px",
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
    const [selectedOptions, setSelectedOptions] = useState([]);
    const wishList = ['평생 숙제 다이어트', '뱃살, 옆구리살 빼기', '마른 몸 벗어나기', '탄탄한 몸 만들기', '넓은 어깨 갖기', '슬림한 하체 만들기', '벌크업 하기', '굵코 큰 팔 만들기', '힙업', '팔뚝 군살 제거', '전체적인 근육량 증가', '선명한 복근 만들기', '굵은 하체 만들기']

    const location = useLocation()
    const navigate = useNavigate();
    // console.log(location)

    const handleOptionsChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        // console.log(selectedOptions)
    }
    // const handleButtonClick = () => {
    //     navigate('/input2', {state:{
    //         ...location.state,
    //         wishList: selectedOptions}
    //     });
    //     console.log(location.state, selectedOptions)
    // };


    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            let formData = {
                ...location.state,
                wishList: selectedOptions
            }
            // console.log(formData)
            await axios.post(REGISTER, formData
            )
            // e.preventDefault()
            alert("Signup successful");
            // console.log(formData)
            navigate('/')
        } catch (error) {
            alert("An error occurred while signing up");
        }
    }

    return (
        <Container>
            <h2>해결하고 싶은 고민이 무엇인가요?</h2>
            <h3 style={{margin:'0 0 -10px 0'}}>{location.state.name}님!</h3>
            <h5>선택해주신 고민들을 기반으로 운동을 추천합니다</h5>
            <div style={{display:'flex', flexDirection:'column',justifyContent:'center', width:'90%'}}>
            <ButtonGroup buttons={wishList} onChange={handleOptionsChange}/>
            <br/>
            <Like onClick={handleSubmit} text={'완료'}></Like>
            </div>
        </Container>
    );
}

export default UserDetail3;