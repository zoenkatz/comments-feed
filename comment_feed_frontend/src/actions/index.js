import * as api from '../utils/api'
import * as actionTypes from './actionTypes.js'


export function editCommentSuccess(data){
    return {type: actionTypes.EDIT_COMMENT_SUCCESS, data};
}

export function editComment(params){
    debugger;
    return function(dispatch) {
        return api.editExistingComment(params.id, params).then(data => {
            if(!data){
                data = null;
            }
            dispatch(editCommentSuccess(data));
        }).catch(error => {
            throw(error);
        });
    };
}


export function deleteCommentSuccess(data){
    return {type: actionTypes.DELETE_COMMENT_SUCCESS, data};
}

export function deleteComment(params){
    debugger;
    return function(dispatch) {
        return api.deleteComment(params).then(data => {
            if(!data){
                data = null;
            }
            dispatch(deleteCommentSuccess(data));
        }).catch(error => {
            throw(error);
        });
    };
}


export function addCommentSuccess(data){
    return {type: actionTypes.ADD_COMMENT_SUCCESS, data};
}

export function addComment(params){
    debugger;
    return function(dispatch) {
        return api.addComment(params).then(data => {
            if(!data){
                data = null;
            }
            dispatch(addCommentSuccess(data));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadCommentsSuccess(data){
    return {type: actionTypes.LOAD_COMMENTS_SUCCESS, data};
}

export function loadComments(params){
    debugger;
    return function(dispatch) {
        return api.getComments(params).then(data => {
            if(!data){
                data = null;
            }

            dispatch(loadCommentsSuccess(data));
        }).catch(error => {
            throw(error);
        });
    };
}