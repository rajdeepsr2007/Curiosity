import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : false,
    error : null ,
    answers : null, 
    questionId : null
}

const reducer = (state=initialState , action) => {
    switch( action.type ){

        case actionTypes.LOAD_ANSWERS : 
            return {...state , loading : true , error : null , answers : null , questionId : null }

        case actionTypes.LOAD_ANSWERS_SUCCESS : 
            return {...state , loading : false , answers : action.answers , questionId : action.questionId }

        case actionTypes.LOAD_ANSWERS_FAILED : 
            return {...state , loading : false , error : action.error}

        default : 
            return state

    }
}

export default reducer;