import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';

export const loadAnswersStart = () => {
    return {
        type : actionTypes.LOAD_ANSWERS
    }
}

export const loadAnswersSuccess = (answers , questionId) => {
    return {
        type : actionTypes.LOAD_ANSWERS_SUCCESS ,
        answers : answers,
        questionId : questionId
    }
}

export const loadAnswersFailed = (error) => {
    return {
        type : actionTypes.LOAD_ANSWERS_FAILED ,
        error : error
    }
}

export const loadAnswers = (token,questionId) => {
    return dispatch => {
        dispatch(loadAnswersStart())
        axiosInstance.post('/api/answers/get-answers',{ questionId : questionId },{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if( response ){
                dispatch(loadAnswersSuccess(response.data.answers, questionId))
            }else{
                dispatch(loadAnswersFailed('Network Error'))
            }
        } )
        .catch( error => {
            dispatch(loadAnswersFailed(error.message));
        } )
    }
}


const voteAnswerSuccess = (questionId , answerId , type , message ) => {
    return {
        type : actionTypes.VOTE_ANSWER_SUCCESS ,
        questionId ,
        answerId , 
        voteType : type ,
        message
    }
}



export const voteAnswer = (token , answerId , type , questionId) => {
    return dispatch => {
        axiosInstance.post('/api/answers/vote' , { answerId : answerId , type : type },{
           headers : {
               "Authorization" : "Bearer " + token
           }
        } )
        .then( response => {
            if( response ){
                dispatch( voteAnswerSuccess(questionId , answerId , type , response.data.message) )
            }
        })
        .catch( error => {
           
        } )
    }
}

const deleteAnswerStart = () => {
    return {
        type : actionTypes.DELETE_ANSWER_START
    }
}
const deleteAnswerComplete = () => {
    return {
        type : actionTypes.DELETE_ANSWER_COMPLETE
    }
}
export const deleteAnswer = (token , answerId , questionId ) => {
    return dispatch => {
        dispatch(deleteAnswerStart())
        axiosInstance.delete(`/api/answers/delete-answer/${answerId}/${questionId}`,{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then(response => {
            if( response ){
                dispatch(removeAnswer(answerId,questionId))
            }
            dispatch(deleteAnswerComplete())
        })
        .catch(error => {
            dispatch(deleteAnswerComplete)
        })
    }
}

const removeAnswer = (answerId , questionId) => {
    return{
        type : actionTypes.REMOVE_ANSWER,
        answerId ,
        questionId
    }
}