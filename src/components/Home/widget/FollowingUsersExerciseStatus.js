import React, {useEffect, useState} from 'react';
import {functions} from "../../../utils/Functions";
import axios from "axios";
import {GET_FOLLOWERS_EXERCISES_STATUS} from "../../../services/api";
import {NavigationBar} from "../../UI/NavigationBar";
import {Container, DoughnutBox, Scroll, ThemeColor, UserBox, UserBoxSize} from "../../UI/UIPackage";
import {Doughnut} from "react-chartjs-2";
import {backgroundData, backgroundOptions, chartData, frontOption} from "../../../config/doughnutChart";
import exerciseName from "../../../config/exercise.json";
import styled from "styled-components";


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
  width: 290px;
  padding-right: 10px;
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


const MemberExerciseStatus = ({goal}) => {
    const percent = goal.attain / goal.number * 100

    return (
        <ExerciseStatusBox>
            <DoughnutBox size={'180'}>
                <span className={'back'}>
                    {<Doughnut data={backgroundData} options={backgroundOptions}/>}
                </span>
                <span className={'front'}>
                    {<Doughnut data={chartData(goal.label, percent)} options={frontOption}/>}
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
    const goal = data?.goal ? data.goal.goals : []

    console.log(data)
    return (
        <MemberExerciseStatusBox>
            <UserBox name={data.name} size={UserBoxSize.medium} className={'userBox'}/>
            <Scroll>
                {(data?.goal) ?
                    goal.map((goal, index) => (
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
function FollowingUsersExerciseStatus(props) {

    const [userData, setUserData] = useState();
    // console.log(userData)


    const getFollowersExercisesStatus = async () => {
        try {
            const headers = await functions.getJWT()
            const res = await axios.get(GET_FOLLOWERS_EXERCISES_STATUS, {headers: headers})
            setUserData(res.data.followingUsersExerciseStatus)
        } catch (error) {
            console.error(error)
        } finally {
            // setIsLoading(false)
        }
    }
    useEffect(() => {
        getFollowersExercisesStatus().then()
    }, [])
    return (
        <Container>

            <h4>팀원들의 운동 상태</h4>
            <div style={{width: '390px'}}>

                {
                    userData?.map((member, index) => (
                        <Carousel key={index} data={member} componentToRender={<MemberExerciseStatus/>}/>
                    ))
                }
            </div>
            <NavigationBar/>

        </Container>
    );
}

export default FollowingUsersExerciseStatus;