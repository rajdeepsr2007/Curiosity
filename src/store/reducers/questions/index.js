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

        case actionTypes.DELETE_QUESTION_START :
            return {
                ...state,
                loading : {
                    type : 'deleting',
                    questionId : action.questionId
                }
            }

        case actionTypes.DELETE_QUESTION_COMPLETE :
            return{
                ...state,
                loading : false
            }

        case actionTypes.REMOVE_QUESTION :
            const updatedQuestions = state.questions.filter(question => question._id !== action.questionId );
            return{
                ...state,
                questions : updatedQuestions
            }

        default : 
            return state
    }
}

export default reducer;