import React from 'react';
import {Carousel, Container, NavigationBar, RecBox} from "../UI/UIPackage";
import styled from "styled-components";


const Box = styled.div`
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 16px 0 0 16px;
  margin: 0 0 30px 30px;
  //margin-bottom: 30px;
  width:360px;
`

function Exercise(props) {
    return (
        <Container>
            <h1>운동</h1>
            <Box>
                <h3 style={{marginLeft:'20px'}}>하체 운동</h3>
                <Carousel componentToRender={<RecBox/>}/>
            </Box>
            <Box>
                <h3 style={{marginLeft:'20px'}}>복근 운동</h3>
                <Carousel componentToRender={<RecBox/>}/>
            </Box>
            <Box>
                <h3 style={{marginLeft:'20px'}}>팔 운동</h3>
                <Carousel componentToRender={<RecBox/>}/>
            </Box>

            <NavigationBar/>

        </Container>
    );
}

export default Exercise;
