import React from 'react';
import {Carousel, SquareBox} from "../../UI/UIPackage";
import {Doughnut} from "react-chartjs-2";

function StatusOfMAtes(props) {

    const data = {
        labels: ['fuck', 'you'],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: ['#FF6384', 'rgba(0, 0, 0, 0)'],
                // hoverBackgroundColor: ['#FF6384', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [50, 50],
                backgroundColor: ['blue', 'rgba(0, 0, 0, 0)'],
                // hoverBackgroundColor: ['#FF6384', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [80, 20],
                backgroundColor: ['green', 'rgba(0, 0, 0, 0)'],
                // hoverBackgroundColor: ['#FF6384', 'rgba(0, 0, 0, 0)'],
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
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 50,
            },
        },
    };

    return (
        <div>
            <div style={{marginLeft:'30px'}}>메이트들의 운동 현황</div>
            <Carousel componentToRender={<SquareBox componentToRender={<Doughnut data={data} options={options}/>}/>}/>
        </div>
    );
}

export default StatusOfMAtes;