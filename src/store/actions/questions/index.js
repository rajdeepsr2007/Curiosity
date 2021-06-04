import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';

const loadQuestionsStart = () => {
    return {
        type : actionTypes.LOAD_QUESTIONS
    }
}

const loadQuestionsSuccess = (questions , showing , results , filter) => {
    return {
        type : actionTypes.LOAD_QUESTIONS_SUCCESS,
        questions : questions ,
        showing,
        results,
        filter
    }
}

const loadQuestionsFailed = (error) => {
    return {
        type : actionTypes.LOAD_QUESTIONS_FAILED,
        error : error
    }
}


const compareFilters = (filter1 , filter2 , fields) => {
    if( filter1 && filter2 ){
        for( let field of fields ){
            if( (filter1[field] && filter2[field] && filter1[field].length === filter2[field].length) ){
                filter1[field].sort();
                filter2[field].sort();
                for( let i = 0 ; i < filter1.length ; i++ ){
                    console.log(field , filter1[field][i] , filter2[field[i]]);
                    if( filter1[field][i] !== filter2[field][i] ){
                        return false;
                    }
                }
            }else if(!filter1[field] && !filter2[field]){
                continue;
            }
            else{
                return false;
            }
        }
        return true;
    }else if( !filter1 && !filter2 ){
        return true;
    }else{
        return false;
    }
}


export const loadQuestions = (token , filter , refresh ) => {
    return (dispatch , getState) => {

        const alreadyAppliedFilter = getState().questions.filter;
        if( !compareFilters(alreadyAppliedFilter , filter , ['topics','spaces','similar']) ){
            refresh = true;
        }


        const alreadyShowing = refresh ? 0 :  getState().questions.showing;
        const alreadyLoadedQuestions = refresh ? [] : getState().questions.questions;


        dispatch( loadQuestionsStart() );
        axiosInstance.post('/api/questions/get-questions',{ filter : filter , rangeStart  : alreadyShowing } , {
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if( response ){
                const questions = alreadyLoadedQuestions ? alreadyLoadedQuestions : [];
                for( let question of response.data.questions ){
                    questions.push(question)
                }
                const showing = alreadyShowing + response.data.questions.length;
                dispatch(loadQuestionsSuccess(questions , showing , response.data.results , filter));
            }else{
                dispatch(loadQuestionsFailed('Network Error'));
            }
        } )
        .catch(error => {
            dispatch(loadQuestionsFailed(error.message))
        })
    }
}

