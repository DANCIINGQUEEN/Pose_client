import React from 'react';
import {ThemeColor} from "../../UI/UIPackage";
import {Doughnut} from "react-chartjs-2";
import Slider from "react-slick";
import styled from "styled-components";


const Carousel = ({componentToRender, data}) => {
    const settings = {
        arrows: false,
        dots: true,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2.8,
        onSwipe: null,
    };
    return (
        <div style={{maxWidth: "380px", margin: '0 0 0 10px'}}>
            <Slider {...settings} >
                {Object.values(data).map((data, index) => (
                    <div key={index}>{React.cloneElement(componentToRender, {data: data})}</div>
                ))}
            </Slider>
        </div>
    );
}
const SquareBox = ({componentToRender, data}) => {
    const squatPercent = data.squat / 100
    const pullUpPercent = data.pullUp / 100
    const pushUpPercent = data.pushUp / 100
    // console.log(squatPercent, pullUpPercent, pushUpPercent)
    const chartData = {
        labels: ['턱걸이', '스쿼트', '푸쉬업'],
        datasets: [
            {
                data: [pullUpPercent, 1 - pullUpPercent],
                backgroundColor: ['hotpink', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [squatPercent, 1 - squatPercent],
                backgroundColor: ['blue', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [pushUpPercent, 1 - pushUpPercent],
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
                borderWidth: 190,
                borderColor: 'transparent',
                borderRadius: 50,
            },
        },
    };
    const backgroundData = {
        labels:[1,2,3],
        datasets: [
            {
                data:[100,0],
                backgroundColor:['rgba(204, 51, 128, 0.2)', 'rgba(0, 0, 0, 0)']
            },
            {
                data:[100,0],
                backgroundColor:['rgba(0, 0, 153, 0.2)', 'rgba(0, 0, 0, 0)']
            },
            {
                data:[100,0],
                backgroundColor:['rgba(0, 64, 0, 0.2)', 'rgba(0, 0, 0, 0)']
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
                borderWidth: 190,
                borderColor: 'transparent',
                // borderRadius: 50,
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
            <span style={{
                position: 'absolute',
                zIndex: '2',
                fontSize: '18px',
            }}>{data.name}
            </span>
            <span style={{position:'absolute', }}>
                {<Doughnut data={backgroundData} options={backgroundOptions}/>}
            </span>
            <span style={{position:'absolute',  }}>
                {<Doughnut data={chartData} options={options}/>}
            </span>
        </div>
    );
};

function StatusOfMAtes(props) {
    const usersData = {
        john: {
            name: 'john',
            squat: 30,
            pushUp: 50,
            pullUp: 70,
        },
        park: {
            name: 'park',
            squat: 70,
            pushUp: 50,
            pullUp: 50,
        },
        kim: {
            name: 'kim',
            squat: 50,
            pushUp: 80,
            pullUp: 20,
        },
        hong: {
            name: 'hong',
            squat: 100,
            pushUp: 120,
            pullUp: 10,
        },
        lee: {
            name: 'lee',
            squat: 50,
            pushUp: 40,
            pullUp: 15,
        },
        choi: {
            name: 'choi',
            squat: 30,
            pushUp: 50,
            pullUp: 70,
        },
        jang: {
            name: 'jang',
            squat: 70,
            pushUp: 90,
            pullUp: 40,
        },
        yoon: {
            name: 'yoon',
            squat: 50,
            pushUp: 80,
            pullUp: 20,
        }
    }

    return (
        <div>
            <div style={{marginLeft: '30px'}}>메이트들의 운동 현황</div>
            <Carousel data={usersData} componentToRender={<SquareBox/>}/>
        </div>
    );
}

export default StatusOfMAtes;