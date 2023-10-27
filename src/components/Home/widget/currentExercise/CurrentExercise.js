import React from 'react';
import {Scroll, ThemeColor, LinkBox, fadeIn} from "../../../UI/UIPackage";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {Doughnut} from "react-chartjs-2";
import {CURRENT, MATE, WISH_EXERCISE} from "../../../../services/api";
import exerciseName from "../../../../config/exercise";
import styled from "styled-components";


const RecBox = ({data}) => {
    const label = data.label
    const number = data.number
    const attain = data.attain
    const percent = attain / number * 100
    const chartData = {
        labels: [exerciseName[label]],
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
                borderWidth: 190,
                borderColor: 'transparent',
                borderRadius: 50,
            },
        },
    };
    const backgroundData = {
        labels: ['pink'],
        datasets: [
            {
                data: [100, 0],
                backgroundColor: ['rgba(204, 51, 128, 0.2)', 'rgba(0, 0, 0, 0)']
            }
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
                borderWidth: 190,
                borderColor: 'transparent',
            },
        },
    };

    return (
        <div style={{
            width: "123px",
            height: "123px",
            backgroundColor: `${ThemeColor.containerColor}`,
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
    );
};
const CarouselBox=styled.div`
  animation: ${fadeIn} 0.7s ease;
  .exerciseLabel {

    display: flex;
    justify-content: center;
    align-items: center;
    //border: 1px solid black;
    margin-bottom: -10px;
    font-weight:bold;
    font-size: 13px;
  }
`

const Carousel = ({componentToRender, data}) => {
    return (
        <Scroll>
            {Object.values(data).map((data, index) => (
                <CarouselBox key={index}>
                    <span className={'exerciseLabel'}>{exerciseName[data.label]}</span>
                    {React.cloneElement(componentToRender, {data: data})}
                </CarouselBox>
            ))}
        </Scroll>
    )
}
const UserCurrentExercise = ({goals}) => {
    const name = useSelector((state) => state.name)

    return (
        <div style={{width: '390px'}}>
            <div style={{marginLeft: '30px', display: 'flex', justifyContent: 'space-between'}}>
                <p>
                    {name}님의 운동
                </p>
                <Link to={CURRENT} style={{textDecoration: 'none', color: 'black'}}>
                    <FontAwesomeIcon icon={faArrowRight} style={{marginRight: '20px', marginTop: '15px'}}/>
                </Link>
            </div>
            <Carousel data={goals} componentToRender={<RecBox/>}/>
        </div>
    );
}

function CurrentExercise() {
    const goals = useSelector((state) => state.goals)
    return (
        <>
            {goals ?
                <UserCurrentExercise goals={goals}/>
                :
               <LinkBox url={WISH_EXERCISE} title={'선택된 운동이 없습니다!'} content={'운동 선택하러 가기'}/>

            }
        </>
    );
}

export default CurrentExercise;