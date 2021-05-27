import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';

const loadQuestionsStart = () => {
    return {
        type : actionTypes.LOAD_QUESTIONS
    }
}

const loadQuestionsSuccess = (questions) => {
    return {
        type : actionTypes.LOAD_QUESTIONS_SUCCESS,
        questions : questions
    }
}

const loadQuestionsFailed = (error) => {
    return {
        type : actionTypes.LOAD_QUESTIONS_FAILED,
        error : error
    }
}

export const loadQuestions = (token) => {
    return dispatch => {
        dispatch( loadQuestionsStart() );
        axiosInstance.get('/api/questions/get-questions',{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if( response ){
                dispatch(loadQuestionsSuccess(response.data.questions));
            }else{
                dispatch(loadQuestionsFailed('Network Error'));
            }
        } )
        .catch(error => {
            dispatch(loadQuestionsFailed(error.message))
        })
    }
}

