import React from 'react';
import {Scroll, ThemeColor} from "../../UI/UIPackage";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";


const RecBox = ({componentToRender, data}) => {
    return (
        <div style={{
                width: "123px",
                height: "161px",
                backgroundColor: `${ThemeColor.importantColor}`,
                margin: "10px",
                marginLeft: '10px',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                borderRadius: '16px'
            }}
        >
            <p>{data}</p>
        </div>
    );
};
const Carousel= ({componentToRender, data}) => {
    return (
        <Scroll>
            {Object.values(data).map((data, index) => (
                <div key={index}>
                    {React.cloneElement(componentToRender, {data: data})}
                </div>
            ))}
        </Scroll>
    )
}
function CurrentExercise(props) {
    const data=[1,2,3,4,5]
    return (
        <div style={{maxWidth:'390px'}}>
            <div style={{marginLeft: '30px', display:'flex', justifyContent:'space-between'}}>
                <div>
                    유저의 현재 운동
                </div>
                <Link to={'/account'} style={{textDecoration:'none', color:'black'}}>
                    <FontAwesomeIcon icon={faArrowRight} style={{marginRight:'20px'}}/>
                </Link>

            </div>
            <Carousel data={data} componentToRender={<RecBox/>}/>
        </div>
    );
}

export default CurrentExercise;