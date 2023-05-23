import React from 'react';
import {ThemeColor} from "../../UI/UIPackage";
import {Doughnut} from "react-chartjs-2";
import Slider from "react-slick";
import styled from "styled-components";


const Carousel = ({componentToRender, data}) => {
    const settings = {
        arrows:false,
        dots: true,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2.8,
        onSwipe: null,
    };
    const realData=data
    const userData=Object.keys(data)

    return (
        <div style={{maxWidth: "380px", margin: '0 0 0 10px'}}>
            <Slider {...settings} >
                {userData.map((data, index) => (
                    // <Box number={number} key={number} />
                    <div key={index}>{React.cloneElement(componentToRender, {data:realData[data]})}</div>
                    // <div key={index}>{<Doughnut data={data}/>}</div>
                ))}
            </Slider>
        </div>
    );
}
const SquareBox = ({componentToRender, data}) => {
    const squatPercent=data.squat/100
    const pullUpPercent=data.pullUp/100
    const pushUpPercent=data.pushUp/100
    // console.log(squatPercent, pullUpPercent, pushUpPercent)
    const chartData = {
        labels: ['턱걸이', '스쿼트', '푸쉬업'],
        datasets: [
            {
                data: [pullUpPercent, 1-pullUpPercent],
                backgroundColor: ['hotpink', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [squatPercent, 1-squatPercent],
                backgroundColor: ['blue', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [pushUpPercent, 1-pushUpPercent],
                backgroundColor: ['green', 'rgba(0, 0, 0, 0)'],
            }
        ],
    };
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
                borderWidth: 10,
                borderColor: 'transparent',
                borderRadius: 50,
            },
        },
    };
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
            {<Doughnut data={chartData} options={options}/>}
        </div>
    );
};

function StatusOfMAtes(props) {
    const usersData={
        john:{
            name:'john',
            squat:30,
            pushUp:50,
            pullUp:70,
        },
        park:{
            name:'park',
            squat:70,
            pushUp:50,
            pullUp:50,
        },
        kim:{
            name:'kim',
            squat:50,
            pushUp:80,
            pullUp:20,
        },
        hong:{
            name:'hong',
            squat:100,
            pushUp:120,
            pullUp:10,
        },
        lee:{
            name:'lee',
            squat:50,
            pushUp:40,
            pullUp:15,
        },
        choi:{
            name:'choi',
            squat:30,
            pushUp:50,
            pullUp:70,
        },
        jang:{
            name:'jang',
            squat:70,
            pushUp:90,
            pullUp:40,
        },
        yoon:{
            name:'yoon',
            squat:50,
            pushUp:80,
            pullUp:20,
        }
    }

    return (
        <div>
            <div style={{marginLeft:'30px'}}>메이트들의 운동 현황</div>
            <Carousel data={usersData} componentToRender={<SquareBox/>}/>
        </div>
    );
}

export default StatusOfMAtes;