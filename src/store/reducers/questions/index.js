import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : true ,
    error : null ,
    questions : null ,
    results : 0 ,
    showing : 0 ,
    filter : []
}

const reducer = (state=initialState , action) => {
    switch( action.type ){
        case actionTypes.LOAD_QUESTIONS :
            return { loading : true , error : null , results : 0 , showing : 0 , filter : [] }

        case actionTypes.LOAD_QUESTIONS_SUCCESS : 
            return { loading : false , questions : action.questions , results : action.results , showing : action.showing , filter : action.filter }

        case actionTypes.LOAD_QUESTIONS_FAILED : 
            return { loading : false , error : action.error }

        default : 
            return state
    }
}

export default reducer;