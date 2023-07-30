import React, {useEffect, useRef, useState} from 'react';
import styled, {keyframes} from "styled-components";
import {Button, CustomSelect, InfoBox, Input, Loading, Modal, ThemeColor, UserBox, UserBoxSize} from "../UI/UIPackage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {GET_FOLLOWING, GET_FOLLOWERS} from "../api";
import {useDispatch, useSelector} from "react-redux";
import {putFollowingNames, putFollowerNames} from "../state/userState";


export const SettingModal = () => {
    return (
        <>fuck you</>
    )

}
export const Hello = () => {
    return (
        <>hello</>
    )
}

export const UserProfileSetting = ({name, email}) => {
    return (
        <div style={{
            width: '300px',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: ThemeColor.divColor,
            borderRadius: '16px',
            padding: '10px 0px',
            marginLeft: '10px'
        }}>
            {name &&
                <UserBox name={name} email={email} size={UserBoxSize.large}/>
            }

        </div>
    )
}
const StyledSpan = styled.span`
  margin: 5px 180px 5px 2px;
`;
export const ChangeUserProfile = ({name, email}) => {
    const [newName, setNewName] = useState(name)
    const [newEmail, setNewEmail] = useState(email);
    const [password, setPassword] = useState("");
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleUpdate = () => {
        console.log(newName, newEmail, password ? password : null)
    }
    //비밀번호가 없으면 없는대로 업데이트 하고 있으면 같이 서버로 보내는 함수 작성


    return (
        <>
            <StyledSpan>이름</StyledSpan>
            <Input type="name" defaultValue={name} onChange={handleNameChange}/>
            <StyledSpan>이메일</StyledSpan>
            <Input type="email" defaultValue={email} onChange={handleEmailChange}/>
            <StyledSpan>비밀번호</StyledSpan>
            <Input type="password" defaultValue={''} onChange={handlePasswordChange}/>
            <br/>
            <Button onClick={handleUpdate}>수정</Button>
        </>
    )
}
export const FollowingSetting = ({following}) => {
    return (
        <InfoBox style={{width: '120px'}}>
            <p>팔로잉</p>
            <p>{following ? following && following.length : '0'}명</p>
        </InfoBox>
    )
}
export const ShowFollowing = ({following}) => {
    // const [followingUsers, setFollowingUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    const fetchData = async () => {
        const jwt = sessionStorage.getItem('jwt')
        const headers = {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
            // 여기서 받아온 데이터를 state로 저장하거나, 다른 작업을 수행할 수 있습니다.v
        }
        setIsLoading(true)

        try {
            const response = await axios.post(GET_FOLLOWING, {
                    following,
                },
                {headers: headers});
            const data = response.data;
            // setFollowingUsers(data.following)
            dispatch(
                putFollowingNames({followingNames:data.following})
            )
            setIsLoading(false)

        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    };
    useEffect(() => {
            fetchData().then(() => {
                console.log('get data complete!')
            })
        }
        , [following])

    const {followingNames} = useSelector(state => state)
    if(isLoading) return (<Loading/>)

    if(followingNames?.length===0) return (<span>팔로잉한 계정이 없습니다.</span>)
    return (
        <>
            <span>팔로잉</span>

            <span>
                    {followingNames?.map((user) => (
                        <InfoBox style={{width:'230px'}} key={user[1]}>
                            <UserBox
                                name={user[0]}
                                email={user[1]}
                                size={UserBoxSize.medium}
                                style={{padding:'5px 0px'}}
                            />

                        </InfoBox>

                    ))}
                </span>
        </>
    )
}
export const FollowersSetting = ({followers}) => {

    return (
        <InfoBox style={{width: '120px'}}>
            <p>팔로워</p>
            <p>{followers ? followers && followers.length : '0'}명</p>
        </InfoBox>
    )
}
export const ShowFollowers = ({followers}) => {
    // const [followerUsers, setFollowerUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    const fetchData = async () => {
        const jwt = sessionStorage.getItem('jwt')
        const headers = {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
        setIsLoading(true)

        try {
            const response = await axios.post(GET_FOLLOWERS, {
                    followers,
                },
                {headers: headers});
            const data = response.data;
            // console.log('hi',data.followers);
            dispatch(
                putFollowerNames({followerNames:data.followers})
            )
            // setFollowerUsers(data.followers)

            setIsLoading(false)

        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    };
    useEffect(() => {
        fetchData().then(() => {
            console.log('get data complete!')
        })
        }
        , [followers])

    const {followerNames} = useSelector(state => state)
    // console.log(followerNames, 'f')
    if(isLoading) return (<Loading/>)
    if(followerNames?.length===0) return (<span>팔로워가 없습니다.</span>)
    return (
        <>
            <span>팔로워</span>

            {followerNames?.map((user) => (
                <InfoBox style={{width:'230px'}} key={user[1]}>
                    <UserBox
                        name={user[0]}
                        email={user[1]}
                        size={UserBoxSize.medium}
                        style={{padding:'5px 0px'}}
                    />

                </InfoBox>
            ))}
        </>
    )

}

export const AreaSetting = ({area}) => {
    return (
        <InfoBox style={{width: '120px'}}>
            <p>지역</p>
            <p>{area}</p>
        </InfoBox>
    )
}
export const ChangeArea = ({area}) => {
    return (
        <></>
    )
}
export const AgeSetting = ({age}) => {
    return (
        <InfoBox style={{width: '120px'}}>
            <p>나이</p>
            <p>{age}</p>
        </InfoBox>
    )
}
export const ChangeAge = ({age}) => {
    const [newAge, setNewAge] = useState(null);
    const ageList = ['10대', '20대', '30대', '40대', '50대', '60대 이상']
    const handleAgeChange = (selectedAge) => {
        setNewAge(selectedAge)
    }
    return (
        <div style={{width:'300px'}}>
            <CustomSelect options={ageList} item='나이' onChange={handleAgeChange} />
        </div>
    )
}

export const WeightSetting = ({weight}) => {
    return (
        <InfoBox style={{width: '120px'}}>
            <p>몸무게</p>
            <p>{weight} <span style={{fontSize: '15px'}}>kg</span></p>
        </InfoBox>
    )
}

export const ChangeWeight = ({weight}) => {
    const [newWeight, setNewWeight] = useState(null);
    const weightList = ['50 이하', 50, 60, 70, 80, 90, '90 이상']

    const handleWeightChange = (selectedWeight) => {
        setNewWeight(selectedWeight)
    }
    return (
        <div style={{width:'300px'}}>
            <CustomSelect options={weightList} item='몸무게' onChange={handleWeightChange} />
        </div>
    )
}
export const HeightSetting = ({height}) => {
    return (
        <InfoBox style={{width: '120px'}}>
            <p>키</p>
            <p>{height} <span style={{fontSize: '15px'}}>cm</span></p>
        </InfoBox>
    )
}
export const ChangeHeight = ({height}) => {
    const [newHeight, setNewHeight] = useState(null);
    const heightList = ['150 이하', 150, 160, 170, 180, 190, '190 이상']

    const handleHeightChange = (selectedHeight) => {
        setNewHeight(selectedHeight)
    }
    return (
        <div style={{width:'300px'}}>
            <CustomSelect options={heightList} item='키' onChange={handleHeightChange} />
        </div>
    )
}
export default {
    SettingModal,
    Hello,
    UserProfileSetting,
    ChangeUserProfile,


    FollowingSetting,
    ShowFollowing,

    FollowersSetting,
    ShowFollowers,


    AreaSetting,
    ChangeArea,

    AgeSetting,
    ChangeAge,

    WeightSetting,
    ChangeWeight,

    HeightSetting,
    ChangeHeight,
};