import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : null ,
    error : null ,
    success : null,
    comments : {}
}

const copyComments = (comments) => {
    const commentsObject = {};
    for( let answerKey in comments ){
        const commentsArray = [];
        for( let i = 0 ; i < comments[answerKey].length ; i++ ){
            commentsArray.push({ ...comments[answerKey][i] , user : {...comments[answerKey][i].user} })
        }
        commentsObject[answerKey] = commentsArray;
    }
    return commentsObject;
}

const reducer = (state=initialState , action) => {

    let updatedComments;

    switch( action.type ){

        case actionTypes.LOAD_COMMENTS_START : 
            return {
                loading : {
                    answerId : action.answerId,
                    type : 'loading'
                },
                error : null ,
                success : null ,
                comments : copyComments(state.comments)
            }

        case actionTypes.LOAD_COMMENTS_SUCCESS : 
            updatedComments = copyComments(state.comments);
            updatedComments[action.answerId] = action.comments;
            return {
                loading : false ,
                error : null ,
                comments : updatedComments
            }
            
        case actionTypes.LOAD_COMMENTS_FAILED :
            return {
                loading : false ,
                error : {
                    answerId : action.answerId,
                    message : action.error,
                    type : 'loading'
                },
                comments : state.comments
            }

        case actionTypes.ADD_COMMENT_START : 
           
            return { 
                loading : { 
                    answerId : action.answerId ,
                    type : 'add' 
                } , 
                error : null ,
                success : null , 
                comments : copyComments(state.comments) 
            }


        case actionTypes.ADD_COMMENT_SUCCESS : 
            updatedComments = copyComments(state.comments);
            updatedComments[action.answerId] = [...[action.comment] , ...updatedComments[action.answerId]]
            return {
                 loading : false ,
                 error : null , 
                 success : { 
                    answerId : action.answerId ,
                    message : 'Comment Added',
                    type : 'add' 
                    } ,
                 comments : updatedComments
            }



        case actionTypes.ADD_COMMENT_FAILED : 
            return { 
                loading : false ,
                error : { 
                    answerId : action.answerId , 
                    message : action.error,
                    type : 'add'
                }  , 
                success : null ,
                comments : state.comments
            }



        default :
            return state;
    }
}

export default reducer;