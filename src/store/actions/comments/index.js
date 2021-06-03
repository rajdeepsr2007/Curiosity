import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';

const loadCommentsStart = (answerId) => {
    return {
        type : actionTypes.LOAD_COMMENTS_START ,
        answerId
    }
}

const loadCommentsSuccess = (comments , answerId) => {
    return {
        type : actionTypes.LOAD_COMMENTS_SUCCESS,
        comments ,
        answerId
    }
}

const loadCommentsFailed = (answerId,error) => {
    return {
        type : actionTypes.LOAD_COMMENTS_FAILED ,
        answerId ,
        error
    }
}

export const loadComments = (token , answerId) => {
    return dispatch => {
        dispatch(loadCommentsStart(answerId))
        axiosInstance.post('/api/comments/get-comments',{ answerId : answerId },{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if( response ){
                dispatch(loadCommentsSuccess(response.data.comments , answerId))
            }else{
                dispatch(loadCommentsFailed('Network error' , answerId));
            }
        } )
        .catch( error => {
            dispatch(loadCommentsFailed(error.message , answerId));
        } )
    }
}

const addCommentStart = (answerId) => {
    return {
        type : actionTypes.ADD_COMMENT_START ,
        answerId
    }
}

const addCommentSuccess = (answerId, comment) => {
    return {
        type : actionTypes.ADD_COMMENT_SUCCESS ,
        answerId , 
        comment
    }
}

const addCommentFailed = (answerId , error) => {
    return {
        type : actionTypes.ADD_COMMENT_FAILED ,
        answerId , 
        error
    }
}

export const addComment = (token , answerId , description) => {
    return dispatch => {
        dispatch( addCommentStart(answerId) );
        axiosInstance.post('/api/comments/add',{ answerId , description },{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if( response ){
                console.log(response.data);
                dispatch( addCommentSuccess(answerId , response.data.comment) );
            }else{
                dispatch( addCommentFailed(answerId , 'Network Error') );
            }
        } )
        .catch(error => {
            dispatch(addCommentFailed(answerId , error.message));
        })
    }
}