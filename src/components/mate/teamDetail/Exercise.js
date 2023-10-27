import React, {useEffect, useState} from 'react';
import {Container, NavigationBar, Scroll, ThemeColor, UserBox, UserBoxSize,} from "../../UI/UIPackage";
import {functions} from "../../../utils/Functions";
import axios from "axios";
import {Doughnut} from "react-chartjs-2";
import {useLocation} from "react-router-dom";
import styled from "styled-components";

import {GET_TEAM_MEMBERS_EXERCISE_STATUS} from "../../../services/api";
import exerciseName from "../../../config/exercise";

const MemberExerciseStatusBox = styled.div`
  > :first-child {
    margin: 20px 0 10px 20px;
  }

  .noUserExerciseData {
    width: 280px;
    height: 50px;
    background-color: ${ThemeColor.containerColor};
    border-radius: 10px;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
`
const ExerciseStatusBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 280px;
  background-color: ${ThemeColor.containerColor};
  border-radius: 20px;
  margin-left: 10px;

  .memberExerciseDetailStatus {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;

  }

  .exerciseLabel {
    font-weight: bold;
    font-size: 15px;
  }
`
const DoughnutBox = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`


const MemberExerciseStatus = ({goal}) => {
    const percent = goal.attain / goal.number * 100
    const chartData = {
        labels: [goal.label],
        datasets: [
            {
                data: [percent, 100 - percent],
                backgroundColor: ['hotpink', 'rgba(0, 0, 0, 0)']
            }
        ]
    }
    const options = {
        cutoutPercentage: 30,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            arc: {
                borderWidth: 130,
                borderColor: 'transparent',
                borderRadius: 50,
            },
        },
    }
    const backgroundData = {
        labels: ['none'],
        datasets: [
            {
                data: [100, 0],
                backgroundColor: ['rgba(204, 51, 128, 0.2)', 'rgba(0, 0, 0, 0)']
            },
        ]
    }
    const backgroundOptions = {
        cutoutPercentage: 30,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            arc: {
                borderWidth: 130,
                borderColor: 'transparent',
            },
        },
    };
    const a = 20
    const b = a + 130
    const c = a - 170
    return (
        <ExerciseStatusBox>
            <DoughnutBox>
                <span style={{
                    position: 'relative', zIndex: '1', left: `${b}px`
                }}>
                    {<Doughnut data={backgroundData} options={backgroundOptions}/>}
                </span>
                <span style={{position: 'relative', zIndex: '2', left: `${c}px`}}>
                    {<Doughnut data={chartData} options={options}/>}
                </span>
            </DoughnutBox>
            <div className={'memberExerciseDetailStatus'}>
                <p className={'exerciseLabel'}>{exerciseName[goal.label]}</p>
                <p>달성률 {isNaN(percent) ? '0' : Math.round(percent)}%</p>
                <p>{goal.cycle}</p>
            </div>
        </ExerciseStatusBox>
    )
}

const Carousel = ({componentToRender, data}) => {
    const exercise = data?.exercise ? data.exercise.goals : []

    return (
        <MemberExerciseStatusBox>
            <UserBox name={data.name} size={UserBoxSize.medium} className={'userBox'}/>
            <Scroll>
                {(data?.exercise) ?
                    exercise.map((goal, index) => (
                            <div key={index}>
                                {React.cloneElement(componentToRender, {goal: goal})}
                            </div>
                        )
                    ) :
                    <div className={'noUserExerciseData'}>운동 데이터가 없습니다.</div>
                }
            </Scroll>
        </MemberExerciseStatusBox>

    )
}

function Exercise(props) {

    const [membersExerciseStatus, setMembersExerciseStatus] = useState()

    const location = useLocation()
    const teamId = location.pathname.split('/')[2]

    useEffect(() => {
        // getMembersExerciseStatus().then()
        axios.get(`${GET_TEAM_MEMBERS_EXERCISE_STATUS}/${teamId}`, {headers: functions.getJWT()})
            .then(res => setMembersExerciseStatus(res.data))
            .catch(err => console.error(err))
    }, []);


    return (
        <Container>

            <h4>팀원들의 운동 상태</h4>
            <div style={{width: '390px'}}>

                {
                    membersExerciseStatus?.map((member, index) => (
                        <Carousel key={index} data={member} componentToRender={<MemberExerciseStatus/>}/>
                    ))
                }
            </div>
            <NavigationBar/>

        </Container>
    );
}

export default Exercise;