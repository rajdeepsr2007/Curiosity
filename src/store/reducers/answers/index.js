import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : false,
    error : null ,
    answers : {}, 
}

const copyAnswersObject = (answers) => {
    const answersObject = {};
    for( let questionKey in answers ){
        answersObject[questionKey] = [];
        for( let i = 0 ; i < answers[questionKey].length ; i ++ ){
            answersObject[questionKey].push({ ...answers[questionKey][i] , user : {...answers[questionKey][i].user} })
        }
    }
    return answersObject;
}

const reducer = (state=initialState , action) => {
    switch( action.type ){

        case actionTypes.LOAD_ANSWERS : 
            return {...state , loading : true , error : null , answers : copyAnswersObject(state.answers) }

        case actionTypes.LOAD_ANSWERS_SUCCESS : 
            const updatedAnswers = copyAnswersObject(state.answers);
            updatedAnswers[action.questionId] = action.answers;
            return {...state , loading : false , answers : updatedAnswers }

        case actionTypes.LOAD_ANSWERS_FAILED : 
            return {...state , loading : false , error : action.error}

        default : 
            return state

    }
}

export default reducer;