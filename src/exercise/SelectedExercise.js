import React from 'react';
import {Container, exerciseImage, exerciseName, NavigationBar, ThemeColor} from "../UI/UIPackage";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const RecBox = ({image, text}) => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/exercise/training', {
            state: {exercise: text}
        })
    }
    const image_url = process.env.PUBLIC_URL + '/' + image
    return (
        <>
            <button onClick={handleButtonClick}
                    style={{
                        width: "123px",
                        height: "161px",
                        backgroundColor: `${ThemeColor.importantColor}`,
                        margin: "10px",
                        marginLeft: '20px',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        borderRadius: '16px',
                        border: 'none',
                    }}
            >
                <img src={image_url} alt="" style={{borderRadius: '16px'}}/>
            </button>
        </>

    );
};
const ExerciseBox = ({goal}) => {
    const label = goal.label
    const image = exerciseImage[label]
    return (
        <div>
            <span style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '-10px',
                fontWeight: 'bold'
            }}>
                {exerciseName[label]}
            </span>
            <RecBox image={image} text={exerciseName[label]}/>
        </div>
    )
}

function SelectedExercise(props) {
    const goals = useSelector((state) => state.goals)

    return (
        <Container>
            <h1>선택한 운동</h1>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>

            {
                Object.values(goals).map((goal, index) => (
                    <ExerciseBox key={index} goal={goal}/>
                ))
            }
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                }}>
                <Link to={'/exercise'} style={{
                    textDecoration: 'none',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '160px'
                }}>
                    <div>모든 운동 보기</div>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </Link>

            </div>

            <NavigationBar/>
        </Container>
    );
}

export default SelectedExercise;
