import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

// 액션 타입 정의

export const LOAD_POSTS_REQUEST = 'post/LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'post/LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'post/LOAD_POSTS_FAILURE';


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

// dummyData
// {
//     id: "1",
//     content: '첫 번째 게시글 #해시태그 #익스프레스',
//     User: {
//         id: 1,
//         nickname: "와빵",
//     },
//     Images: [
//         {
//             id: shortId.generate(),
//             src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?update=20180726',
//         },
//         {
//             id: shortId.generate(),
//             src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
//         },
//         {
//             id: shortId.generate(),
//             src: 'https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1IBC/image/aLsVmPfNMT4AayYnwof72R-alDE',
//         },
//     ],
//     Comments: [
//         {
//             id: shortId.generate(),
//             User: {
//                 id: shortId.generate(),
//                 nickname: 'nero',
//             },
//             content: '우왕 신기하다~'  
//         },
//         {
//             id: shortId.generate(),
//             User: {
//                 id: shortId.generate(),
//                 nickname: 'yolo',
//             },
//             content: 'ㅎㅎ 오래된 책 같은데여?'
//         }
//     ]
// }


// 이니셜 스테이트
const initialState = {
    mainPosts: [],
    imagePaths: [],
    hasMorePosts: true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
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

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
        src: faker.image.image()
    }],
    Comments: [{
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName()
        },
        content: faker.lorem.sentence(),
    }],

}));


// 리듀서
const post = ( state = initialState, action ) => produce(state, (draft) => {
    switch (action.type) {
        case LOAD_POSTS_REQUEST:
            draft.loadPostsLoading = true;
            draft.loadPostsDone = false;
            draft.loadPostsError = null;
            break;
        case LOAD_POSTS_SUCCESS :
            draft.loadPostsLoading = false;
            draft.mainPosts = action.data.concat(draft.mainPosts);
            draft.loadPostsDone = true;
            draft.hasMorePosts = draft.mainPosts.length < 50;
            break;
        case LOAD_POSTS_FAILURE :
            draft.loadPostsLoading = false;
            draft.loadPostsError = action.error;
            break;
        case ADD_POST_REQUEST:
            draft.addPostLoading = true;
            draft.addPostDone = false;
            draft.addPostError = null;
            break;
        case ADD_POST_SUCCESS :
            draft.addPostLoading = false;
            draft.mainPosts.unshift(dummyPost(action.data));
            draft.addPostDone = true;
            break;
        case ADD_POST_FAILURE :
            draft.addPostLoading = false;
            draft.addPostError = action.error;
            break;
        case REMOVE_POST_REQUEST:
            draft.removePostLoading = true;
            draft.removePostDone = false;
            draft.removePostError = null;
            break;
        case REMOVE_POST_SUCCESS :
            draft.addPostLoading = false;
            draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
            draft.addPostDone = true;
            break;
        case REMOVE_POST_FAILURE :
            draft.addPostLoading = false;
            draft.addPostError = action.error;
            break;
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = null;
            break;
        case ADD_COMMENT_SUCCESS : {   
            const post = draft.mainPosts.find((v) => v.id === action.data.postId);
            post.Comments.unshift(dummyComment(action.data));
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            break;
        }
        case ADD_COMMENT_FAILURE :
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;
        default:
            break;
    }
})

export default post;