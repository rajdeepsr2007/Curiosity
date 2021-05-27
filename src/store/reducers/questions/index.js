import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : true ,
    error : null ,
    questions : null
}

const reducer = (state=initialState , action) => {
    switch( action.type ){
        case actionTypes.LOAD_QUESTIONS :
            return { loading : true , error : null }

        case actionTypes.LOAD_QUESTIONS_SUCCESS : 
            return { loading : false , questions : action.questions }

        case actionTypes.LOAD_QUESTIONS_FAILED : 
            return { loading : false , error : action.error }

        default : 
            return state
    }
}

export default reducer;