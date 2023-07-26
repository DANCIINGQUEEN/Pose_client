import React from 'react';
import {Scroll, ThemeColor, exerciseName} from "../../../UI/UIPackage";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {Doughnut} from "react-chartjs-2";


const RecBox = ({componentToRender, data}) => {
    const label=data.label
    const cycle=data.cycle
    const number=data.number
    const attain=10
    const percent=attain/number*100
    // console.log(number, percent)
    const chartData = {
        labels:[exerciseName[label]],
        datasets:[
            {
                data:[percent, 100-percent],
                backgroundColor:['hotpink', 'rgba(0, 0, 0, 0)']
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
            backgroundColor: `${ThemeColor.importantColor}`,
            margin: "15px",
            marginLeft: '10px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            borderRadius: '16px',
        }}>
            {/*<p>{label}</p>*/}
            <span style={{position: 'relative', zIndex: '1', left: '150px'}}>
                {<Doughnut data={backgroundData} options={backgroundOptions}/>}
            </span>
            <span style={{position: 'relative', zIndex: '2', left: '-150px'}}>
                {<Doughnut data={chartData} options={options}/>}
            </span>
        </div>
    );
};

const Carousel= ({componentToRender, data}) => {
    // console.log(data)
    return (
        <Scroll>
            {Object.values(data).map((data, index) => (
                <div key={index}>
                    <span style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '-15px',
                        fontWeight: 'bold',
                        fontSize: '13px',
                    }}
                    >{exerciseName[data.label]}
                        </span>
                    {React.cloneElement(componentToRender, {data: data})}
                </div>
            ))}
        </Scroll>
    )
}
const NoGoal= () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '16px',
                padding: '20px',
                backgroundColor: ThemeColor.divColor
            }}>
            <h3 style={{marginTop: '0px'}}>선택한 운동이 없습니다!</h3>
            <Link to={'/exercise/wishexercise'} style={{
                textDecoration: 'none',
                color: 'black',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '160px'
            }}>
                <div>운동 선택하러 가기</div>
                <FontAwesomeIcon icon={faArrowRight}/>
            </Link>

        </div>
    )
}
const UserCurrentExercise = ({goals}) => {
    const name = useSelector((state) => state.name)

    return (
        <div style={{width:'390px'}}>
            <div style={{marginLeft: '30px', display:'flex', justifyContent:'space-between'}}>
                <p>
                    {name}님의 현재 운동
                </p>
                <Link to={'/exercise/current'} style={{textDecoration:'none', color:'black'}}>
                    <FontAwesomeIcon icon={faArrowRight} style={{marginRight:'20px', marginTop:'15px'}}/>
                </Link>
            </div>
            <Carousel data={goals} componentToRender={<RecBox/>}/>
        </div>
    );
}
function CurrentExercise() {
    const goals = useSelector((state) => state.goals)
    // console.log(goals)

    return (

        <>
        {goals?
                (<UserCurrentExercise goals={goals}/>)
                :
                (<NoGoal/>)
        }
        </>
    );
}

export default CurrentExercise;