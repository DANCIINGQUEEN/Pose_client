import React, {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";
import styled, {keyframes} from 'styled-components';

//로딩
import {ClipLoader} from "react-spinners";
//캐러셀
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDumbbell, faHouse, faPeopleGroup, faUser} from '@fortawesome/free-solid-svg-icons';


export const ThemeColor = {
    rootColor: 'rgba(217, 217, 217, 0.11)',
    containerColor: 'rgba(217, 217, 217, 0.2)',
    divColor: 'rgba(217, 217, 217, 0.4)',
    importantColor: 'rgba(217, 217, 217, 0.6)',
    primaryColor: 'rgba(160, 160, 160)',
    navColor: 'rgba(217, 217, 217, 0.3)',
    disabledButtonColor: 'rgb(163,183,233)',
    buttonColor: 'rgba(97, 137, 239, 1)'
}
export const UserBoxSize={
    large:35,
    medium:30,
    small:25
}

const rainbowAnimation = keyframes`
  0% {
    border-color: red;
  }
  14% {
    border-color: orange;
  }
  28% {
    border-color: yellow;
  }
  42% {
    border-color: green;
  }
  57% {
    border-color: blue;
  }
  71% {
    border-color: indigo;
  }
  85% {
    border-color: violet;
  }
  100% {
    border-color: red;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 16px;
  padding: 0 20px;
  background-color: ${ThemeColor.divColor};
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border: 2px solid;
    animation: ${rainbowAnimation} 5s linear infinite;
    
  }

`
export const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 16px;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
  background-color: ${ThemeColor.buttonColor};
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;

  &:focus {
    //outline: none;
    //border: 1px solid #000;
    outline: none;
    border: 2px solid;
    animation: ${rainbowAnimation} 5s linear infinite;
  }
`
export const Scroll = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 10px;
    border-radius: 5px;
    background-color: ${ThemeColor.containerColor};
  }
  &::-webkit-scrollbar-thumb {
    width:10px;
    background-color: ${ThemeColor.importantColor};
    border-radius: 5px;
  }
  
`

const SelectContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  background-color: ${ThemeColor.divColor};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

`;

const SelectedOption = styled.div`
  margin-left: 20px;
`;

const Arrow = styled.div`
  margin-right: 20px;
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  margin-top: 10px;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
    // visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  // transition: opacity 0.5s ease-out, visibility 1s ease-out;
`;

const Option = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  z-index: 10;
  border-radius: 16px;

  &:hover {
    background-color: ${ThemeColor.buttonColor};
  }
`;

export const CustomSelect = ({item, options, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const containerRef = useRef(null);
    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option)
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <SelectContainer ref={containerRef} onClick={toggleOptions}>
            <SelectedOption>{selectedOption ?? item}</SelectedOption>
            <Arrow>{isOpen ? '▲' : '▼'}</Arrow>
            {isOpen && (
                <OptionsList isOpen={isOpen}>
                    {options.map((option) => (
                        <Option key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </Option>
                    ))}
                </OptionsList>
            )}
        </SelectContainer>
    );
};

export const Exit = ({text}) => {
    const q = text
    return (
        <div>{q}</div>
    )
}
export const HorizonLine = () => {
    return (
        <div
            style={{
                width: "100%",
                textAlign: "center",
                borderBottom: "1px solid #aaa",
                lineHeight: "0.1em",
                margin: "10px 0 20px",
            }}
        >
            {/*<span style={{background: "#fff", padding: "0 10px"}}>{text}</span>*/}
        </div>
    );
};
export const UserProfile = ({text, size}) => {
    const fontSize = (3 * size) / 5
    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const color = randomColor();
    const textColor = (parseInt(color.replace('#', ''), 16) > 0xffffff / 2) ? 'black' : 'white';
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
                <span style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    background: color,
                    color: textColor,
                    display: 'flex',
                    fontSize: `${fontSize}px`,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {text.length > 0 && text[0].toUpperCase()}
                </span>
        </div>
    )
}

export const Loading = () => {
    return (
        <div className="loading">
            <ClipLoader
                size={20}
                color={'#123abc'}
                loading={true}
            />
        </div>
    );

}

export const UserBox = ({name, email, size}) => {
    const fontSize = (3 * size) / 5
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <UserProfile text={name} size={size}/>
            <div style={{textAlign: 'left', marginLeft: '10px'}}>
                <div style={{fontSize:fontSize}}>{name}</div>
                <div style={{fontSize:fontSize}}>{email}</div>
            </div>
        </div>
    )
}
export const RecBox = ({componentToRender}) => {
    return (
        <div
            style={{
                width: "123px",
                height: "161px",
                backgroundColor: `${ThemeColor.importantColor}`,
                margin: "10px",
                marginLeft: '20px',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                borderRadius: '16px'
            }}
        >
            {componentToRender}
        </div>
    );
};
export const PillBox = ({text}) => {
    return (
        <div
            style={{
                width: "120px",
                height: "32px",
                backgroundColor: `${ThemeColor.importantColor}`,
                margin: "10px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                borderRadius: '16px'
            }}
        >
            {text}
        </div>
    );
};
export const SquareBox = ({componentToRender}) => {
    return (
        <div
            style={{
                width: "123px",
                height: "123px",
                backgroundColor: `${ThemeColor.importantColor}`,
                margin: "15px",
                marginLeft: '20px',

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                borderRadius: '16px',
            }}
        >
            {componentToRender}
        </div>
    );
};

export const Carousel = ({componentToRender, data}) => {
    const settings = {
        arrows: false,
        dots: true,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2.8,
        onSwipe: null,
    };
    const boxes = Array.from(Array(7).keys());
    return (
        <div style={{maxWidth: "380px", margin: '0 0 0 10px'}}>
            <Slider {...settings} >
                {boxes.map((number) => (
                    // <Box number={number} key={number} />
                    <div key={number}>{componentToRender}</div>
                ))}
            </Slider>
        </div>
    );
}
export const CarouselList = ({componentToRender, list}) => {
    const settings = {
        arrows: false,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2.8,
        onSwipe: null,
    };
    return (
        <div style={{maxWidth: "380px", margin: '0 0 0 10px'}}>
            <Slider {...settings} >
                {list.map((text, index) => (
                    <div key={index}>{React.cloneElement(componentToRender, {text})}</div>
                ))}
            </Slider>
        </div>
    );
}
const Nav = styled.nav`
  z-index: 999;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 390px;
  height: 60px;
  //overflow: auto; /* 추가된 부분 */
  background-color: ${ThemeColor.navColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  //overflow: hidden;
  // box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 16px 16px 0 0;
`;
const BodyPadding = styled.div`
  padding-bottom: 60px;
  display: flex;
  justify-content: center;
`;
const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //color: #9b9b9b;
  color: ${ThemeColor.navColor};
  font-size: 0.8rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const NavigationBar = ({onExerciseClick, onRankingClick, onCommunityClick, onMateClick, onAccountClick}) => {
    const [activateLink, setActivateLink] = useState(null)
    const style = {
        textDecoration: 'none',
        color: activateLink === 'exercise' || 'ranking' || 'home' || 'community' || 'account' ? 'black' : '#9b9b9b',
        // fontWeight: activateLink === 'exercise' ? 'bold' : 'normal',
        display: 'flex',
        flexDirection: 'column',
    }
    const iconStyle = {
        fontSize: '20px',
    }
    const fontStyle = {
        fontSize: '0.6rem',
    }

    const handleLinkClick = (link) => {
        setActivateLink(link)
    }
    return (
        <BodyPadding>
            <Nav>
                <NavButton onClick={() => handleLinkClick('exercise')}>
                    <Link to={'/exercise'} style={style}>
                        <FontAwesomeIcon icon={faDumbbell} style={iconStyle}/>
                        <span style={fontStyle}>
                        운동
                    </span>
                    </Link>
                </NavButton>
                <NavButton onClick={onMateClick}>
                    <Link to={'/'} style={style}>
                        <FontAwesomeIcon icon={faHouse} style={iconStyle}/>
                        <span style={fontStyle}>
                        홈
                    </span>
                    </Link>
                </NavButton>
                <NavButton onClick={onCommunityClick}>
                    <Link to={'/mate'} style={style}>
                        <FontAwesomeIcon icon={faPeopleGroup} style={iconStyle}/>
                        <span style={fontStyle}>
                        메이트
                    </span>
                    </Link>
                </NavButton>

                <NavButton onClick={onAccountClick}>
                    <Link to={'/account'} style={style}>
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/>
                        <span style={fontStyle}>
                        계정
                    </span>
                    </Link>
                </NavButton>
            </Nav>
        </BodyPadding>
    );
};


export default {
    ThemeColor,
    Container,
    Input,
    Button,
    CustomSelect,
    Exit,
    UserProfile,
    UserBox,
    RecBox,
    PillBox,
    SquareBox,
    CarouselList,
    NavigationBar,
    Loading,
    HorizonLine,

}