import shortId from 'shortid';
import produce from 'immer';

// 액션 타입 정의
export const ADD_POST_REQUEST = 'post/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'post/ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'post/REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'post/REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'post/REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'post/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'post/ADD_COMMENT_FAILURE';

// 액션 생성 함수
export const addPostRequestAction = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addCommentRequestAction = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})


// dummy
const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: "와빵"
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: "와빵"
    },
})


// 이니셜 스테이트
const initialState = {
    mainPosts: [{
        id: "1",
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        User: {
            id: 1,
            nickname: "와빵",
        },
        Images: [
            {
                id: shortId.generate(),
                src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726',
            },
            {
                id: shortId.generate(),
                src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
            },
            {
                id: shortId.generate(),
                src: 'https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1IBC/image/aLsVmPfNMT4AayYnwof72R-alDE',
            },
        ],
        Comments: [
            {
                id: shortId.generate(),
                User: {
                    id: shortId.generate(),
                    nickname: 'nero',
                },
                content: '우왕 신기하다~'  
            },
            {
                id: shortId.generate(),
                User: {
                    id: shortId.generate(),
                    nickname: 'yolo',
                },
                content: 'ㅎㅎ 오래된 책 같은데여?'
            }
        ]
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

};



// 리듀서
const post = ( state = initialState, action ) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            };
        case ADD_POST_SUCCESS :
            return {
                ...state,
                addPostLoading: false,
                mainPosts: [dummyPost(action.data), ...state.mainPosts],
                addPostDone: true,
            }
        case ADD_POST_FAILURE :
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error
            };
        case REMOVE_POST_REQUEST:
            return {
                ...state,
                removePostLoading: true,
                removePostDone: false,
                removePostError: null,
            };
        case REMOVE_POST_SUCCESS :
            return {
                ...state,
                addPostLoading: false,
                mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
                addPostDone: true,
            }
        case REMOVE_POST_FAILURE :
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error
                };
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            };
        case ADD_COMMENT_SUCCESS : {
            // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
            // const post = state.mainPosts[postIndex];
            // const Comments = [dummyComment(action.data), ...post.Comments];
            // console.log(Comments);
            // const mainPosts = [...state.mainPosts];
            // mainPosts[postIndex] = {...post, Comments};
            // return {
            //     ...state,
            //     addCommentLoading: false,
            //     addCommentDone: true,
            //     mainPosts
            // };
            return produce(state, draft => {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
            })
        }
        case ADD_COMMENT_FAILURE :
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error
            };
        default:
            return state;
    }
}

export default post;