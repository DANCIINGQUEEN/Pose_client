import React from 'react';
import {Container, CustomSelect, Input, Box} from "../../../UI/UIPackage";
import styled from "styled-components";
import {useLocation} from "react-router-dom";



function GoalInput({ label }) {
    const amount=['매일', '주 3회', '주 2회', '주 1회']
    const handleChange=(selected)=>{
        console.log(selected)
    }
    return (
        <Box>
            <h4 style={{ marginLeft: "20px" }}>{label} 목표 설정</h4>
            <CustomSelect options={amount} item={'운동 주기'} style={{width:'200px'}}/>
            <Input
                type="text"
                placeholder='횟수'
                style={{ width: "300px", height: "41px", margin: "0 20px 20px 20px" }}

            />
        </Box>
    );
}
function GoalSetting(props) {
    const location = useLocation()
    const selectedExercise = location.state?.selected || ''
    console.log(selectedExercise)
    const amount=['매일', '주 3회', '주 2회', '주 1회']
    return (
        <Container>
            <h1>목표 설정</h1>
            {/*<p>{selectedExercise}</p>*/}
            <Box>
                <h4 style={{marginLeft:"20px"}}>기한 설정</h4>
                <Input type="date" style={{width:"300px",height:"41px",margin:"0 20px 20px 20px"}}/>
            </Box>
            {selectedExercise.map((exercise) => (
                <GoalInput label={exercise}/>
            ))}
            {/*<GoalInput/>*/}
            {/*<Box>*/}
            {/*    <h4 style={{marginLeft:"20px"}}>운동 1 목표 설정</h4>*/}
            {/*    <Input type="text"  style={{width:"300px",height:"41px",margin:"0 20px 20px 20px"}}/>*/}
            {/*    <Input type="text" placeholder='횟수' style={{width:"300px",height:"41px",margin:"0 20px 20px 20px"}}/>*/}
            {/*</Box>*/}
            {/*<Box>*/}
            {/*    <h4 style={{marginLeft:"20px"}}>운동 1 목표 설정</h4>*/}
            {/*    <Input type="text"  style={{width:"300px",height:"41px",margin:"0 20px 20px 20px"}}/>*/}
            {/*    <Input type="text" placeholder='횟수' style={{width:"300px",height:"41px",margin:"0 20px 20px 20px"}}/>*/}
            {/*</Box>*/}
            {/*<Box>*/}
            {/*    <h4 style={{marginLeft:"20px"}}>운동 1 목표 설정</h4>*/}
            {/*    <div style={{width:"300px", display:'flex', justifyContent:'center'}}>*/}

            {/*    <CustomSelect options={amount} item={'운동 주기'}/>*/}
            {/*    </div>*/}
            {/*    <Input type="text" placeholder='횟수' style={{width:"300px",height:"41px",margin:"0 20px 20px 20px"}}/>*/}
            {/*</Box>*/}



        </Container>
    );
}

export default GoalSetting;
