import React from 'react';
import {Carousel, SquareBox} from "../../UI/UIPackage";

function StatusOfMAtes(props) {
    return (
        <div style={{border:'1px solid black', backgroundColor:'yellow'}}>
            <div style={{marginLeft:'30px'}}>메이트들의 운동 현황</div>
            <Carousel componentToRender={<SquareBox/>}/>
        </div>
    );
}

export default StatusOfMAtes;