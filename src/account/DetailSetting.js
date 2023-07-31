import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    CustomSelect,
    Input,
    InfoBox,
    Loading,
    UserBox,
    UserBoxSize, ThemeColor,
} from "../UI/UIPackage";
import {
    UPDATE_PROFILE,
    GET_FOLLOWING,
    GET_FOLLOWERS,
    UPDATE_AGE,
    UPDATE_AREA,
    UPDATE_HEIGHT,
    UPDATE_WEIGHT,
    UPDATE_EXERCISE,
    UPDATE_WISHLIST
} from "../api";
import {
    putFollowingNames,
    putFollowerNames,
    updateProfile,
    updateAge,
    updateHeight,
    updateArea,
    updateWeight,
    updateExercise,
    updateWishList
} from "../state/userState";
import {ButtonGroup} from "../auth/UserDetail3";

const updateData = async (url, dataToUpdate, dispatchUpdateAction, setIsLoading, setIsSuccessMessage, dispatch) => {
    const jwt = sessionStorage.getItem('jwt');
    const headers = {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    };
    setIsLoading(true);
    try {
        const response = await axios.put(url, dataToUpdate, {headers});
        const data = response.data;
        dispatch(dispatchUpdateAction(dataToUpdate));
        if (data.state) {
            setIsLoading(false);
            setIsSuccessMessage(true);
            setTimeout(() => {
                setIsSuccessMessage(false);
            }, 2000);
        }
    } catch (error) {
        console.error('API 요청 에러:', error);
    }
};
export const UserProfileSetting = ({name, email}) => {
    return (
        <>
            {name && <UserBox name={name} email={email} size={UserBoxSize.large}/>}
        </>
    )
}
const StyledSpan = styled.span`
  margin: 5px 180px 5px 2px;
`;
export const ChangeUserProfile = ({name, email}) => {
    const [newName, setNewName] = useState(name)
    const [newEmail, setNewEmail] = useState(email);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isNoChange, setIsNoChange] = useState(false)

    const dispatch = useDispatch();
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    useEffect(() => {
        if (newName === name && newEmail === email) {
            setIsNoChange(true)
        } else {
            setIsNoChange(false)
        }
    }, [newName, newEmail])
    const handleUpdate = () => {
        updateData(
            UPDATE_PROFILE,
            {
                name: newName,
                email: newEmail
            },
            updateProfile, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            (success) => {
                console.log(success);
            },
            (error) => {
                console.error(error);
            }
        );
    };
    //비밀번호가 없으면 없는대로 업데이트 하고 있으면 같이 서버로 보내는 함수 작성
    const handlePasswordUpdate=()=>{
        console.log(password)
    }


    return (
        <>
            <StyledSpan>이름</StyledSpan>
            <Input type="name" defaultValue={name} onChange={handleNameChange}/>
            <StyledSpan>이메일</StyledSpan>
            <Input type="email" defaultValue={email} onChange={handleEmailChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>{isLoading ? (<Loading/>) : ("수정")}</Button>
            <br/>
            <StyledSpan>비밀번호</StyledSpan>
            <Input type="password" defaultValue={''} onChange={handlePasswordChange}/>
            <Button onClick={handlePasswordUpdate}>수정</Button>
        </>
    )
}
export const FollowingSetting = ({following}) => {
    return (
        <>
            <p>팔로잉</p>
            <p>{following ? following && following.length : '0'}명</p>
        </>
    )
}
export const ShowFollowing = ({following}) => {
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
            const response = await axios.post(GET_FOLLOWING, {
                    following,
                },
                {headers: headers});
            const data = response.data;
            dispatch(
                putFollowingNames({followingNames: data.following})
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
    if (isLoading) return (<Loading/>)

    if (followingNames?.length === 0) return (<span>팔로잉한 계정이 없습니다.</span>)
    return (
        <>
            <span>팔로잉</span>
            <span>
                    {followingNames?.map((user) => (
                        <InfoBox style={{width: '230px'}} key={user[1]}>
                            <UserBox
                                name={user[0]}
                                email={user[1]}
                                size={UserBoxSize.medium}
                                style={{padding: '5px 0px'}}
                            />
                        </InfoBox>
                    ))}
                </span>
        </>
    )
}
export const FollowersSetting = ({followers}) => {
    return (
        <>
            <p>팔로워</p>
            <p>{followers ? followers && followers.length : '0'}명</p>
        </>
    )
}
export const ShowFollowers = ({followers}) => {
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
                putFollowerNames({followerNames: data.followers})
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
    }, [followers])

    const {followerNames} = useSelector(state => state)
    if (isLoading) return (<Loading/>)
    if (followerNames?.length === 0) return (<span>팔로워가 없습니다.</span>)
    return (
        <>
            <span>팔로워</span>
            {followerNames?.map((user) => (
                <InfoBox style={{width: '230px'}} key={user[1]}>
                    <UserBox
                        name={user[0]}
                        email={user[1]}
                        size={UserBoxSize.medium}
                        style={{padding: '5px 0px'}}
                    />
                </InfoBox>
            ))}
        </>
    )
}

export const AreaSetting = ({area}) => {
    return (
        <>
            <p>지역</p>
            <p>{area}</p>
        </>
    )
}
export const ChangeArea = ({area}) => {
    const areaList = ['서울', '경기', '인천', '강원', '충북', '충남', '대전', '경북', '경남', '대구', '울산', '부산', '전북', '전남', '광주', '제주']
    const [newArea, setNewArea] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const [isNoChange, setIsNoChange] = useState(false)

    const dispatch = useDispatch();

    const handleAreaChange = (selectedArea) => {
        setNewArea(selectedArea)
    }
    const handleUpdate = () => {
        updateData(
            UPDATE_AREA,
            {area: newArea},
            updateArea, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            (success) => {
                console.log(success);
            },
            (error) => {
                console.error(error);
            }
        );
    };
    useEffect(() => {
        if (!newArea) {
            setIsNoChange(true)
        } else {
            setIsNoChange(false)
        }
    }, [newArea])
    return (
        <div style={{width: '300px'}}>
            <p>현재 지역 : {area}</p>
            <CustomSelect options={areaList} item='지역' onChange={handleAreaChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}
export const AgeSetting = ({age}) => {
    return (
        <>
            <p>나이</p>
            <p>{age}</p>
        </>
    )
}
export const ChangeAge = ({age}) => {
    const [newAge, setNewAge] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const ageList = ['10대', '20대', '30대', '40대', '50대', '60대 이상']
    const [isNoChange, setIsNoChange] = useState(false)

    const dispatch = useDispatch();
    const handleAgeChange = (selectedAge) => {
        setNewAge(selectedAge)
    }
    const handleUpdate = () => {
        updateData(
            UPDATE_AGE,
            {age: newAge},
            updateAge, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {},
            (error) => {
                console.error(error);
            }
        );
    };
    useEffect(() => {
        if (!newAge) {
            setIsNoChange(true)
        } else {
            setIsNoChange(false)
        }
    }, [newAge])
    return (
        <div style={{width: '300px'}}>
            <p>현재 나이 : {age}</p>
            <CustomSelect options={ageList} item='나이' onChange={handleAgeChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}

export const WeightSetting = ({weight}) => {
    const stringWeight = weight.toString()
    return (
        <>
            <p>몸무게</p>
            {stringWeight.includes('이상') || stringWeight.includes('이하') ? (
                <p>
                    {stringWeight.substring(0, 2)} <span
                    style={{fontSize: '15px'}}>kg {stringWeight.includes('이상') ? '이상' : '이하'}</span>
                </p>
            ) : (
                <p>
                    {weight}kg
                </p>
            )}
        </>
    )
}

export const ChangeWeight = ({weight}) => {
    const [newWeight, setNewWeight] = useState(null);
    const weightList = ['50 이하', 50, 60, 70, 80, 90, '90 이상']
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const [isNoChange, setIsNoChange] = useState(false)
    const stringWeight = weight.toString()

    const dispatch = useDispatch();

    const handleWeightChange = (selectedWeight) => {
        setNewWeight(selectedWeight)
    }
    const handleUpdate = () => {
        updateData(
            UPDATE_WEIGHT,
            {weight: newWeight},
            updateWeight, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {},
            (error) => {
                console.error(error);
            }
        );
    };
    useEffect(() => {
        if (!newWeight) {
            setIsNoChange(true)
        } else {
            setIsNoChange(false)
        }
    }, [newWeight])
    return (
        <div style={{width: '300px'}}>
            <p>현재 몸무게 : {stringWeight.includes('이상') || stringWeight.includes('이하') ? (
                <>
                    {stringWeight.substring(0, 2)} <span
                    style={{fontSize: '15px'}}>kg {stringWeight.includes('이상') ? '이상' : '이하'}</span>
                </>
            ) : (
                <>
                    {weight}kg
                </>
            )}</p>
            <CustomSelect options={weightList} item='몸무게' onChange={handleWeightChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}
export const HeightSetting = ({height}) => {
    const stringHeight = height.toString()

    return (
        <>
            <p>키</p>
            {stringHeight.includes('이상') || stringHeight.includes('이하') ? (
                    <p>
                        {stringHeight.substring(0, 3)} <span
                        style={{fontSize: '15px'}}>cm {stringHeight.includes('이상') ? '이상' : '이하'}</span>
                    </p>
                )
                :
                (
                    <p>
                        {height}<span style={{fontSize: '15px'}}>cm</span>
                    </p>
                )
            }
        </>
    )
}
export const ChangeHeight = ({height}) => {
    const [newHeight, setNewHeight] = useState(null);
    const heightList = ['150 이하', 150, 160, 170, 180, 190, '190 이상']
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const [isNoChange, setIsNoChange] = useState(false)
    const stringHeight = height.toString()

    const dispatch = useDispatch();

    const handleHeightChange = (selectedHeight) => {
        setNewHeight(selectedHeight)
    }
    const handleUpdate = () => {
        updateData(
            UPDATE_HEIGHT,
            {height: newHeight},
            updateHeight, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {},
            (error) => {
                console.error(error);
            }
        );
    };
    useEffect(() => {
        if (!newHeight) {
            setIsNoChange(true)
        } else {
            setIsNoChange(false)
        }
    }, [newHeight])
    return (
        <div style={{width: '300px'}}>
            <p>현재 키 : {stringHeight.includes('이상') || stringHeight.includes('이하') ? (
                    <>
                        {stringHeight.substring(0, 3)} <span
                        style={{fontSize: '15px'}}>cm {stringHeight.includes('이상') ? '이상' : '이하'}</span>
                    </>
                )
                :
                (
                    <>
                        {height}<span style={{fontSize: '15px'}}>cm</span>
                    </>
                )
            }</p>
            <CustomSelect options={heightList} item='키' onChange={handleHeightChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}
export const ExerciseSetting = ({exercise}) => {
    return (
        <>
            <p>주로 하는 운동</p>
            <p>{exercise}</p>
        </>
    )
}
export const ChangeExercise = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const dispatch = useDispatch();

    const handleClickChange = (selectedExercise) => {
        console.log(selectedExercise)
        updateData(
            UPDATE_EXERCISE,
            {exercise: selectedExercise},
            updateExercise, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {},
            (error) => {
                console.error(error);
            }
        );
    }
    return (
        <>
            <p>주로 하는 운동 재선택</p>
            {isLoading ? (<Loading/>) : (
                <>
                    <Button onClick={() => handleClickChange('홈 트레이닝')}>홈 트레이닝</Button>
                    <Button onClick={() => handleClickChange('헬스')}>헬스</Button>
                </>
            )}
            {isSuccessMessage && <p>수정 완료</p>}
        </>
    )
}

export const WishListSettingButton = () => {
    return (<span style={{fontWeight: 'bold'}}>고민 수정</span>)
}

export const ChangeWishList = ({wishList}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const newWishList = ['평생 숙제 다이어트', '뱃살, 옆구리살 빼기', '마른 몸 벗어나기', '탄탄한 몸 만들기', '넓은 어깨 갖기', '슬림한 하체 만들기', '벌크업 하기', '굵코 큰 팔 만들기', '힙업', '팔뚝 군살 제거', '전체적인 근육량 증가', '선명한 복근 만들기', '굵은 하체 만들기']

    const [isNoChange, setIsNoChange] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const dispatch = useDispatch();

    const handleOptionsChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    }

    useEffect(() => {
        if (selectedOptions.length === 0) {
            setIsNoChange(true)
        } else {
            setIsNoChange(false)
        }

    }, [selectedOptions])
    const handleUpdate = () => {
        updateData(
            UPDATE_WISHLIST,
            {wishList: selectedOptions},
            updateWishList, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {},
            (error) => {
                console.error(error);
            }
        );
    };
    return (
        <div style={{width: '370px'}}>
            <h2>고민 재선택</h2>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ButtonGroup buttons={newWishList} selectedWishList={wishList} onChange={handleOptionsChange}/>
                <br/>
                <Button disabled={isNoChange} style={{
                    width: '150px',
                    backgroundColor: isNoChange ? ThemeColor.disabledButtonColor : ThemeColor.buttonColor
                }} onClick={handleUpdate}>
                    {isLoading ? (<Loading/>) : ("수정")}
                </Button>

                {isSuccessMessage && <p>수정 완료</p>}
            </div>
        </div>
    )
}
