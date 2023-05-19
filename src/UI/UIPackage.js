import React, {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

//로딩
import {ClipLoader} from "react-spinners";
//캐러셀
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComments, faDumbbell, faHouse, faTrophy, faUser, faUserGroup} from '@fortawesome/free-solid-svg-icons';


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //height: 100vh
`

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 25px;
  padding: 0 20px;
  background-color: rgba(217, 217, 217, 0.51);
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border: 1px solid #000;
  }

`
export const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 25px;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
  background-color: rgba(97, 137, 239, 1);
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`


const SelectContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  background-color: rgba(217, 217, 217, 0.51);
  border-radius: 25px;
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
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
    // visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  // transition: opacity 0.5s ease-out, visibility 1s ease-out;
`;

const Option = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: rgba(97, 137, 239, 1);
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

export const UserBox = ({name, email}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <UserProfile text={name} size={50}/>
            <div style={{textAlign: 'left', marginLeft: '10px'}}>
                <div>{name}</div>
                <div>{email}</div>
            </div>
        </div>
    )
}
export const RecBox = ({componentToRender}) => {
    return (
        <div
            style={{
                width: "125px",
                height: "161px",
                backgroundColor: "#ccc",
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
export const PillBox = ({componentToRender}) => {
    return (
        <div
            style={{
                width: "139px",
                height: "32px",
                backgroundColor: "#ccc",
                margin: "10px",

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
export const SquareBox = ({componentToRender}) => {
    return (
        <div
            style={{
                width: "123px",
                height: "123px",
                backgroundColor: "#ccc",
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
export const Carousel = ({componentToRender}) => {
    const settings = {
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        onSwipe: null,
    };
    const boxes = Array.from(Array(7).keys());
    return (
        <div style={{maxWidth: "380px", margin: "0 0 0 10px"}}>
            <Slider {...settings} style={{margin: '0 0 0 auto'}}>
                {boxes.map((number) => (
                    // <Box number={number} key={number} />
                    <>{componentToRender}</>
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
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  //overflow: hidden;
  // box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 16px 16px 0 0;
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #9b9b9b;
  font-size: 0.8rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const NavigationBar = ({onExerciseClick, onRankingClick, onCommunityClick, onMateClick, onAccountClick}) => {
    const [activateLink, setActivateLink] = useState(null)
    const style = {
        textDecoration: 'none',
        color: activateLink==='exercise'||'ranking'||'home'||'community'||'account'?'black':'#9b9b9b',
        // fontWeight: activateLink === 'exercise' ? 'bold' : 'normal',
        display:'flex',
        flexDirection:'column',
    }
    const iconStyle = {
        fontSize:'20px',
    }
    const fontStyle = {
        fontSize:'0.6rem',
    }

    const handleLinkClick = (link) => {
        setActivateLink(link)
    }
    return (
        <Nav>
            <NavButton onClick={()=>handleLinkClick('exercise')}>
                <Link to={'/exercise'} style={style}>
                    <FontAwesomeIcon icon={faDumbbell} style={iconStyle}/>
                    <span  style={fontStyle}>
                        운동
                    </span>
                </Link>
            </NavButton>
            <NavButton onClick={onRankingClick}>
                <Link to={'/ranking'} style={style}>
                    <FontAwesomeIcon icon={faTrophy} style={iconStyle}/>
                    <span style={fontStyle}>
                        랭킹
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
                <Link to={'/community'} style={style}>
                    <FontAwesomeIcon icon={faComments} style={iconStyle}/>
                    <span style={fontStyle}>
                        커뮤니티
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

    );
};


export default {
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
    Carousel,
    NavigationBar,
    Loading

}