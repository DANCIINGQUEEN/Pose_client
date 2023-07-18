import React from 'react';
import {Box, Container, ThemeColor} from "../../../UI/UIPackage";
import {Doughnut} from "react-chartjs-2";
import {useSelector} from "react-redux";
import styled from "styled-components";


const InfoBox = styled.div`
  //display:flex;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;  
  background-color: ${ThemeColor.divColor};
  border-radius: 16px;
  width: 130px;
  margin-bottom: -9px;
`
const SeveralPTitle = styled.p`
  font-weight: bold;
  margin-left: 12px;
  margin-bottom: -5px;
  //margin:0 0 -5px 10px;
  padding-top: 5px;
`
const SeveralPContent = styled.p`
  margin-left: 13px;
  padding-bottom: 5px;
`

const ExerciseData = ({data, exercise}) => {
    const percent = data / 100
    const chartData = {
        labels: [{exercise}],
        datasets: [
            {
                data: [percent, 1 - percent],
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
    return (
        <div style={{
            width: "205px",
            height: "205px",
            backgroundColor: `${ThemeColor.importantColor}`,
            margin: "15px",
            marginLeft: '10px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            borderRadius: '16px',
        }}>
            <span style={{position: 'relative', zIndex: '1', left: '150px'}}>
                {<Doughnut data={backgroundData} options={backgroundOptions}/>}
            </span>
            <span style={{position: 'relative', zIndex: '2', left: '-150px'}}>
                {<Doughnut data={chartData} options={options}/>}
            </span>
        </div>
    )
}
const EachExercise = () => {
    return(
        <Box>
            <h4 style={{marginLeft: "20px", marginBottom: '5px'}}>운동 1</h4>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <ExerciseData data={70} exercise='운동 1'/>
                <div>
                    <InfoBox>
                        <SeveralPTitle>목표 날짜</SeveralPTitle>
                        <SeveralPContent>2023-7-23</SeveralPContent>
                    </InfoBox>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: ThemeColor.divColor,
                        width: '130px',
                        height: '60px',
                        borderRadius: '16px',
                        margin:'-5px 0 -9px 0',
                    }}>
                        <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <p style={{fontWeight:'bold', marginLeft:'10px'}}>목표치</p>
                            <p style={{marginLeft:'10px', marginTop:'-10px'}}>70회</p>
                        </div>
                        <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <p style={{fontWeight:'bold', marginLeft:'10px'}}>달성량</p>
                            <p style={{marginLeft:'10px', marginTop:'-10px'}}>50회</p>
                        </div>

                    </div>
                    <InfoBox>
                        <SeveralPTitle>달성률</SeveralPTitle>
                        <SeveralPContent>70%</SeveralPContent>
                    </InfoBox>
                </div>
            </div>
        </Box>
    )
}

function Current(props) {
    const name = useSelector((state) => state.name)

    return (
        <Container>
            <h1>{name}님의 현재 운동</h1>
            <EachExercise/>
            <EachExercise/>
            <EachExercise/>

        </Container>
    );
}

export default Current;
