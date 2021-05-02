import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';


// ssr을 위한 reducer;
const reducer = (state = {} , action) => {
    switch(action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    index : reducer,
    user,
    post,
})



export default rootReducer;