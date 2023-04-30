import React from 'react';
import {Carousel, RecBox} from "../../UI/UIPackage";

function CurrentExercise(props) {
    return (
        <div>
            <div style={{marginLeft:'30px'}}>유저의 현재 운동</div>
            <Carousel componentToRender={<RecBox/>}/>
        </div>
    );
}

export default CurrentExercise;