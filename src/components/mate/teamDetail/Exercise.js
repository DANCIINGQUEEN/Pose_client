import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Container, CustomSelect, Input, NavigationBar, rainbowAnimation, ThemeColor} from "../../UI/UIPackage";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {functions} from "../../UI/Functions";
import axios from "axios";
import {CURRENT, GOAL_SETTING} from "../../../services/api";
import {putGoals} from "../../../store/userState";
import exerciseName from "../../../config/exercise.json";


const Box = styled.div`
  background-color: ${ThemeColor.containerColor};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-bottom: 37px;
  width: 370px;
`

const WishList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${ThemeColor.importantColor};
  border-radius: 16px;
  padding: 0 20px;
  margin-bottom: 20px;
  margin-left: 15px;
  width: 300px;
  height: 41px;
`
const SelectButton = styled.button`
  width: 70px;
  height: 29px;
  border: none;
  border-radius: 16px;
  padding: 0 1px;
  font-family: 'Inter', sans-serif;
  background-color: ${ThemeColor.buttonColor};
  box-sizing: border-box;
  margin: 10px -12px 10px 0;
  font-size: 16px;

  &:focus {
    outline: none;
    border: 2px solid;
    animation: ${rainbowAnimation} 5s linear infinite;
  }
`
const H4 = styled.h4`
  margin-left: 20px;
`

function ExerciseButton({onClick, selected}) {
    const buttonText = selected ? '취소' : '선택';

    return (
        <SelectButton
            onClick={onClick}
            style={{
                width: '70px',
                height: '29px',
                padding: '0 1px',
                margin: '10px -12px 10px 0',
                backgroundColor: selected ? ThemeColor.buttonColor : ThemeColor.disabledButtonColor
            }}
        >
            {buttonText}
        </SelectButton>
    );
}

function ExerciseItem({exercise, onClick, selected}) {
    return (
        <WishList>
            <p>{exercise}</p>
            <ExerciseButton onClick={onClick} selected={selected}/>
        </WishList>
    );
}


function Exercise(props) {
    const navigate = useNavigate();


    const [selectedExercises, setSelectedExercises] = useState({
        squat: false,
        lunge: false,
        deadLift: false,
        plank: false,
        crunch: false,
        legRaise: false,
        pushUp: false,
        shoulderPress: false,
        dumbbellRow: false,
        hammerCurl: false
    });
    const trueExercises = Object.keys(selectedExercises).filter(exercise => selectedExercises[exercise]);
    const [isVoteButtonClick, setIsVoteButtonClick] = useState(false)
    const handleButtonClick = () => {
        // navigate('/exercise/goal', {
        //     state:{
        //         selected:[...trueExercises]
        //     }
        // });
        setIsVoteButtonClick(prev=>!prev)

    }

    const handleExerciseSelection = (exercise) => {
        setSelectedExercises(prevState => ({
            ...prevState,
            [exercise]: !prevState[exercise]
        }));
    };
    return (
        <Container>
            <h4>하고싶은 운동 투표하기</h4>
            <Box>
                <H4>복근 운동</H4>
                <ExerciseItem exercise='스쿼트'
                              onClick={() => handleExerciseSelection('squat')}
                              selected={selectedExercises.squat}/>
                <ExerciseItem exercise="런지"
                              onClick={() => handleExerciseSelection('lunge')}
                              selected={selectedExercises.lunge}/>
                <ExerciseItem exercise='데드리프트'
                              onClick={() => handleExerciseSelection('deadLift')}
                              selected={selectedExercises.deadLift}/>

            </Box>
            <Box>
                <H4>하체 운동</H4>
                <ExerciseItem
                    exercise='플랭크'
                    onClick={() => handleExerciseSelection('plank')}
                    selected={selectedExercises.plank}/>
                <ExerciseItem
                    exercise='크런치'
                    onClick={() => handleExerciseSelection('crunch')}
                    selected={selectedExercises.crunch}/>
                <ExerciseItem
                    exercise='레그 레이즈'
                    onClick={() => handleExerciseSelection('legRaise')}
                    selected={selectedExercises.legRaise}/>
            </Box>
            <Box>
                <H4>팔 운동</H4>
                <ExerciseItem
                    exercise='푸쉬업'
                    onClick={() => handleExerciseSelection('pushUp')}
                    selected={selectedExercises.pushUp}/>
                <ExerciseItem
                    exercise='숄더 프레스'
                    onClick={() => handleExerciseSelection('shoulderPress')}
                    selected={selectedExercises.shoulderPress}/>
                <ExerciseItem
                    exercise='덤벨 로우'
                    onClick={() => handleExerciseSelection('dumbbellRow')}
                    selected={selectedExercises.dumbbellRow}/>
                <ExerciseItem
                    exercise='해머 컬'
                    onClick={() => handleExerciseSelection('hammerCurl')}
                    selected={selectedExercises.hammerCurl}/>

            </Box>
            <Button style={{width: '100px'}} onClick={handleButtonClick}>완료</Button>
            {isVoteButtonClick && <VoteResult selectedExercises={trueExercises}/>}
            <br/>

            <NavigationBar/>

        </Container>
    );
}
const EachGoal=styled(Box)`
  h4{
    margin-left: 20px;
  }
  .setting{
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
  }
  .amount{
    margin-left: 20px;
  }
  input{
    width: 100px;
    height: 50px;
    margin: 0 20px 20px 20px;
  }
  .numError{
    margin-left: 20px;
    color:red;
  }
`

function GoalInput({label, onChange}) {
    const amount = ['매일', '주 5회', '주 3회', '주 2회', '주 1회']
    const [number, setNumber] = useState(0)
    const [cycle, setCycle] = useState('')
    const [errorMsg, setErrorMsg] = useState('')


    const handleCycleChange = (selectedCycle) => {
        setCycle(selectedCycle)
        onChange(selectedCycle.option, number)
    }


    const handleAmountChange = (e) => {
        const value=e.target.value
        const isNumber = !isNaN(value);
        setNumber(isNumber ? value : 0);
        setErrorMsg(isNumber ? '' : '숫자를 입력해주세요');
        onChange(cycle.option, value)
    }

    return (
        <EachGoal>
            <h4 >{exerciseName[label]} 목표 설정</h4>
            <div className={'setting'}>
                <div className={'amount'}>
                    <CustomSelect options={amount} item={'운동 주기'} onChange={handleCycleChange}/>
                </div>
                <div>
                    <Input type="number" placeholder='횟수' onChange={handleAmountChange}/>
                    <span>회</span>
                    {errorMsg && <span className={'numError'}>{errorMsg}</span>}
                </div>
            </div>
        </EachGoal>
    );
}

function VoteResult({selectedExercises}){
    const location = useLocation()
    const navigate = useNavigate();

    const [dDay, setDDay] = useState(null)
    const [goals, setGoals] = useState([])

    const handleDDayChange = e => setDDay(e.target.value)


    const handleGoalInputChange = (selectedCycle, amount, label) => {
        const existingGoal = goals.find((goal) => goal.label === label);
        if (existingGoal) {
            const updatedGoal = { ...existingGoal, cycle: selectedCycle, number: amount };
            const updatedGoals = goals.map((goal) => (goal.label === label ? updatedGoal : goal));
            setGoals(updatedGoals);
        } else {
            setGoals([...goals, { label, cycle: selectedCycle, number: amount }]);
        }
    };
    const handleSubmit = async () => {
        const headers=functions.getJWT()
        const userGoal = {
            dDay: dDay,
            goals: goals
        }
        // try {
        //     await axios.post(GOAL_SETTING, {userGoal}, {headers});
        //     dispatch(
        //         putGoals({ dDay: dDay, goals: goals }),)
        //     alert('목표 설정이 완료되었습니다!');
        //     navigate(CURRENT, { state: { dDay: dDay, goals: goals }})
        // } catch (error) {
        //     console.error('에러 발생', error);
        //     alert('목표 설정에 실패했습니다. 다시 시도해주세요.');
        // }
    }
    return (
        <Container>
            <h1>목표 설정</h1>
            <Box>
                <h4 style={{marginLeft: "20px"}}>기한 설정</h4>
                <Input type="date" style={{width: "330px", height: "41px", margin: "0 20px 20px 20px"}}
                       onChange={handleDDayChange}/>
            </Box>
            {selectedExercises.map((exercise) => (
                <GoalInput key={exercise} label={exercise}
                           onChange={(cycle, number) => handleGoalInputChange(cycle, number, exercise)}/>
            ))}

            <Button style={{width: '100px'}} onClick={handleSubmit}>완료</Button>
        </Container>
    );
}

export default Exercise;