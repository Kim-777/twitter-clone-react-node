import produce from 'immer';

// 액션 타입 정의

export const RETWEET_REQUEST = 'post/RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'post/RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'post/RETWEET_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'post/UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'post/UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'post/UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'post/LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'post/LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'post/LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'post/UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'post/UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'post/UNLIKE_POST_FAILURE';

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

export const REMOVE_IMAGE = 'post/REMOVE_IMAGE';

// 액션 생성 함수
export const addPostRequestAction = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addCommentRequestAction = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})



// 이니셜 스테이트
const initialState = {
    mainPosts: [],
    imagePaths: [],
    hasMorePosts: true,
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,
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
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,
    retweetLoading: false,
    retweetDone: false,
    retweetError: null,      
};


// 리듀서
const post = ( state = initialState, action ) => produce(state, (draft) => {
    switch (action.type) {
        case REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
            break;
        case UPLOAD_IMAGES_REQUEST:
            draft.uploadImagesLoading = true;
            draft.uploadImagesDone = false;
            draft.uploadImagesError = null;
            break;
        case UPLOAD_IMAGES_SUCCESS : {
            draft.imagePaths = action.data;
            draft.uploadImagesLoading = false;
            draft.uploadImagesDone = true;
            break;
        }
        case UPLOAD_IMAGES_FAILURE :
            draft.uploadImagesLoading = false;
            draft.uploadImagesError = action.error;
            break;
        case LIKE_POST_REQUEST:
            draft.likePostLoading = true;
            draft.likePostDone = false;
            draft.likePostError = null;
            break;
        case LIKE_POST_SUCCESS : {
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Likers.push({id: action.data.UserId});
            draft.likePostLoading = false;
            draft.likePostDone = true;
            break;
        }
        case LIKE_POST_FAILURE :
            draft.likePostLoading = false;
            draft.likePostError = action.error;
            break;
        case UNLIKE_POST_REQUEST:
            draft.unlikePostLoading = true;
            draft.unlikePostDone = false;
            draft.unlikePostError = null;
            break;
        case UNLIKE_POST_SUCCESS : {
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
            draft.unlikePostLoading = false;
            draft.unlikePostDone = true;
            break;
            
        }
        case UNLIKE_POST_FAILURE :
            draft.unlikePostLoading = false;
            draft.unlikePostError = action.error;
            break;
        case LOAD_POSTS_REQUEST:
            draft.loadPostsLoading = true;
            draft.loadPostsDone = false;
            draft.loadPostsError = null;
            break;
        case LOAD_POSTS_SUCCESS :
            draft.loadPostsLoading = false;
            draft.mainPosts = draft.mainPosts.concat(action.data);
            draft.loadPostsDone = true;
            draft.hasMorePosts = draft.mainPosts.length === 10;
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
            draft.mainPosts.unshift(action.data);
            draft.addPostDone = true;
            draft.imagePaths = [];
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
            draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
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
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Comments.unshift(action.data);
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            break;
        }
        case ADD_COMMENT_FAILURE :
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;
        case RETWEET_REQUEST:
            draft.retweetLoading = true;
            draft.retweetDone = false;
            draft.retweetError = null;
            break;
        case RETWEET_SUCCESS : {
            draft.retweetLoading = false;
            draft.retweetDone = true;
            draft.mainPosts.unshift(action.data);
            break;
        }
        case RETWEET_FAILURE :
            draft.retweetLoading = false;
            draft.retweetError = action.error;
            break;
        default:
            break;
            
    }
})

export default post;