const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://competitive-leticia-danciingqueen.koyeb.app' // 배포된 서버 주소
    : 'http://localhost:3001' // 로컬 서버 주소

const API={
    //서버통신
    //로그인
    LOGIN: `${API_BASE_URL}/user/login`,
    GET_USER_FULL_INFO: `${API_BASE_URL}/user/getUserFullInfo`,

    //회원가입
    SEND_VERIFY_CODE: `${API_BASE_URL}/user/sendVerificationCode`,
    VERIFY_CODE: `${API_BASE_URL}/user/verifyCode`,
    REGISTER: `${API_BASE_URL}/user/register`,

    //추천 유저
    GET_RECOMMEND_USER: `${API_BASE_URL}/user/getRecommendUsers`,
    //게시물 업로드
    UPLOAD_USER_POST: `${API_BASE_URL}/user/uploadPost`,
    //팔로잉하는 유저들의 게시물 가져오기
    GET_POSTS: `${API_BASE_URL}/user/getPosts`,
    //이미지 경로
    GET_IMAGE: `${API_BASE_URL}/`,

    //유저 팔로우
    FOLLOW_USER: `${API_BASE_URL}/user/followUser`,

    //유저의 운동 목표 설정
    GOAL_SETTING: `${API_BASE_URL}/user/goalSetting`,
    //운동 목표 초기화
    INITIAL_GOAL: `${API_BASE_URL}/user/initialGoal`,
    //운동 기록 업데이트
    UPDATE_ATTAIN: `${API_BASE_URL}/user/updateUserExerciseAttain`,

    //유저의 팔로워, 팔로잉 목록
    GET_FOLLOWERS:`${API_BASE_URL}/user/getFollowers`,
    GET_FOLLOWING:`${API_BASE_URL}/user/getFollowing`,
    //언팔
    GET_UNFOLLOW:`${API_BASE_URL}/user/getUnfollow`,

    //유저 정보 수정
    UPDATE_PROFILE:`${API_BASE_URL}/user/updateProfile`,
    UPDATE_INFORMATION:`${API_BASE_URL}/user/updateInformation`,
    IS_PASSWORD_CORRECT:`${API_BASE_URL}/user/isPasswordCorrect`,
    UPDATE_PASSWORD:`${API_BASE_URL}/user/updatePassword`,


    //URL
    //회원가입
    NEW_USER: '/register',
    USER_DETAIL:'/userdetail',
    USER_DETAIL_2:'/userdetail2',
    USER_DETAIL_3:'/userdetail3',

    //네비게이션
    SELECTED_EXERCISE:'/exercise/selected',
    WISH_EXERCISE:'/exercise/wishexercise',

    //운동
    EXERCISE:'/exercise',
    GOAL:'/exercise/goal',
    TRAINING:'/exercise/training',


    //운동상태
    CURRENT:'/exercise/current',

    //랭킹
    RANKING:'/ranking',

    //메이트
    MATE:'/mate',
    //추천 유저
    RECOMMEND_USER:'/recommendUser',
    //게시물 업로드
    UPLOAD_POST:'/uploadPost',

    //계정
    USER_SETTING:'/usersetting',
    ACCOUNT:'/account',

}

module.exports = API;
