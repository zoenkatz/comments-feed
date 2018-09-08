import { combineReducers } from 'redux'
import * as actionTypes from '../actions/actionTypes.js'
import _ from 'lodash'

function comments(state = [], action){
    switch (action.type) {
        case actionTypes.LOAD_COMMENTS_SUCCESS:
            return action.data;
        case actionTypes.ADD_COMMENT_SUCCESS:
            return state.concat(action.data);
        case actionTypes.DELETE_COMMENT_SUCCESS:
            return _.reject(state, {'id': action.data.id});
        default :
            return state
    }
}

export default combineReducers({
    comments
})