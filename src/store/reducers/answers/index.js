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
    let updatedAnswers;
    switch( action.type ){

        case actionTypes.LOAD_ANSWERS : 
            return {...state , loading : true , error : null , answers : copyAnswersObject(state.answers) }

        case actionTypes.LOAD_ANSWERS_SUCCESS : 
            updatedAnswers = copyAnswersObject(state.answers);
            updatedAnswers[action.questionId] = action.answers;
            return {...state , loading : false , answers : updatedAnswers }

        case actionTypes.LOAD_ANSWERS_FAILED : 
            return {...state , loading : false , error : action.error}

        case actionTypes.VOTE_ANSWER_SUCCESS :

            updatedAnswers = copyAnswersObject(state.answers);
            const answerIndex = updatedAnswers[action.questionId].findIndex( answer => {
                return JSON.stringify(answer._id) === JSON.stringify(action.answerId)
            } )
            let upvoteInc = 0 , downvoteInc = 0 , upvoted = false , downvoted = false;
            if( action.message === 'Vote Removed' ){
                upvoteInc = action.voteType === 'upvote' ? -1 : 0 ;
                downvoteInc = action.voteType === 'downvote' ? -1 : 0;
            }else if( action.message === 'Vote Created' ){
                upvoteInc = action.voteType === 'upvote' ? upvoted = true &&  1 : 0 ;
                downvoteInc = action.voteType === 'downvote' ? downvoted = true &&  1 : 0;
            }else{
                if( action.voteType === 'upvote' ){
                    upvoteInc = 1 ; downvoteInc = -1;
                    upvoted = true;
                }else{
                    upvoteInc = -1 ; downvoteInc = 1;
                    downvoted = true;
                }
            }
            updatedAnswers[action.questionId][answerIndex].upvotes = parseInt(updatedAnswers[action.questionId][answerIndex].upvotes , 10) + upvoteInc;
            updatedAnswers[action.questionId][answerIndex].downvotes = parseInt(updatedAnswers[action.questionId][answerIndex].downvotes , 10) + downvoteInc;
            updatedAnswers[action.questionId][answerIndex].upvoted = upvoted;
            updatedAnswers[action.questionId][answerIndex].downvoted = downvoted;

            return {...state , answers : updatedAnswers}


        case actionTypes.DELETE_ANSWER_START : 
            return{
                ...state,
                loading : true
            }

        case actionTypes.DELETE_ANSWER_COMPLETE : 
            return{
                ...state,
                loading : false
            }

        case actionTypes.REMOVE_ANSWER :
            updatedAnswers = copyAnswersObject(state.answers);
            if( updatedAnswers && updatedAnswers[action.questionId] ){
                updatedAnswers[action.questionId] =  updatedAnswers[action.questionId].filter(answer => answer._id !== action.answerId)
            }
            return{
                ...state,
                answers : updatedAnswers
            }

        default : 
            return state

    }
}

export default reducer;