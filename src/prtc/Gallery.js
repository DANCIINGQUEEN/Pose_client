import React from 'react';

import styled from 'styled-components';
import {ThemeColor} from "../UI/UIPackage";
import Slider from "react-slick";

const Scroll = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.4);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
`

function Gallery({componentToRender}) {
    const boxes = Array.from(Array(7).keys());
    return (
        <Scroll style={{border:'1px solid black'}}>

            <>

                {boxes.map((number) => (
                    <div key={number} style={{border:'1px solid black'}}>{componentToRender}</div>
                ))}

            </>
        </Scroll>
    );
}

export default Gallery;

