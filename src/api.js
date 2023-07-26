const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://competitive-leticia-danciingqueen.koyeb.app' // 배포된 서버 주소
    : 'http://localhost:3001' // 로컬 서버 주소

const API={
    //로그인
    LOGIN: `${API_BASE_URL}/user/login`,
    GET_USER_BASIC_INFO: `${API_BASE_URL}/user/getUserBasicInfo`,
    GET_USER_FULL_INFO: `${API_BASE_URL}/user/getUserFullInfo`,
    //회원가입
    SEND_VERIFY_CODE: `${API_BASE_URL}/user/sendVerificationCode`,
    VERIFY_CODE: `${API_BASE_URL}/user/verifyCode`,
    REGISTER: `${API_BASE_URL}/user/register`,
    //추천 유저
    GET_RECOMMEND_USER: `${API_BASE_URL}/user/getRecommendUsers`,
    //유저 팔로우
    FOLLOW_USER: `${API_BASE_URL}/user/followUser`,
    //유저의 운동 목표 설정
    GOAL_SETTING: `${API_BASE_URL}/user/goalSetting`,

}

module.exports = API