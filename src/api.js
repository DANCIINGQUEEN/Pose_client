const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://pose2team.vercel.app' // 배포된 서버 주소
    : 'http://localhost:3001' // 로컬 서버 주소

const API={
    //로그인
    LOGIN: `${API_BASE_URL}/user/login`,
    GET_USER_INFO: `${API_BASE_URL}/user/getUser`,
    SEND_VERIFY_CODE: `${API_BASE_URL}/user/sendVerificationCode`,
    VERIFY_CODE: `${API_BASE_URL}/user/verifyCode`,
    REGISTER: `${API_BASE_URL}/user/register`,
}

module.exports = API