import { EvalSourceMapDevToolPlugin } from 'webpack';
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
        axiosInstance.get('/answers/get-answers',{ questionId : questionId },{
            headers : {
                "AUthorization" : "Bearer " + token
            }
        })
        .then( response => {
            if( response ){
                dispatch(loadAnswersSuccess(response.data.answers), questionId)
            }else{
                dispatch(loadAnswersFailed('Network Error'))
            }
        } )
        .catch( error => {
            dispatch(loadAnswersFailed(error.message));
        } )
    }
}