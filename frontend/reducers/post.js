// 액션 타입 정의
const ADD_POST = 'post/ADD_POST';


// 액션 생성 함수
export const addPost = () => ({
    type: ADD_POST,
})

// dummy
const dummyPost = {
    id: 2,
    content: '더미데이터입니다.',
    User: {
        id: 1,
        nickname: "와빵"
    },
    Images: [],
    Comments: [],
};


// 이니셜 스테이트
const initialState = {
    mainPosts: [{
        id: 1,
        content: '첫 번째 게시글 #해시 태그 #익스프레스',
        User: {
            id: 1,
            nickname: "와빵",
        },
        Images: [
            {
                src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726',
            },
            {
                src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
            },
            {
                src: 'https://gimg/gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
            },
        ],
        Comments: [
            {
                User: {
                    nickanme: 'nero',
                },
                content: '우왕 신기하다~'  
            },
            {
                User: {
                    nickname: 'yolo',
                },
                content: 'ㅎㅎ 오래된 책 같은데여?'
            }
        ]
    }],
    imagePaths: [],
    postAdded: false,

};



// 리듀서
const post = ( state = initialState, action ) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
        default:
            return state;
    }
}

export default post;