// 액션 타입
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

// 액션 생성 함수
export const login = ({ id, password }) => ({
    type: LOGIN,
    data: {
        id,
        password
    }
})

export const logout = () => ({
    type: LOGOUT,
})

// 이니셜 스테이트
const initialState = {
    isLoggedIn: false,
    me: null,
    signUpdata: {},
    loginData: {},
}


// 리듀서
const user = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN :
            return {
                ...state,
                isLoggedIn: true,
                me: action.data,
            }
        case LOGOUT :
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }
        default:
            return state;
    }
}


export default user;