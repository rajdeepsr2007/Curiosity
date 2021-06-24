import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : false ,
    error : null ,
    spaces : [],
    filter : {},
    results : 0
}

const reducer = (state=initialState , action) => {
    let updatedSpaces;
    switch( action.type ){
        case actionTypes.LOAD_SPACES : 
            return {...state , loading : true , error : null }

        case actionTypes.LOAD_SPACES_SUCCESS : 
            return {...state , loading :false , spaces : action.spaces , filter : action.filter , results : action.results }

        case actionTypes.LOAD_SPACES_FAILED : 
            return {...state , loading : false , error : action.error}

        case actionTypes.FOLLOW_SPACE :
            return {
                ...state ,
                loading : {
                    type : 'following',
                    spaceId : action.spaceId
                },
                error : null
            }

        case actionTypes.FOLLOW_SPACE_SUCCESS : 
            updatedSpaces = [];
            for(let space of state.spaces){
                if( JSON.stringify(space._id) === JSON.stringify(action.spaceId) ){
                    updatedSpaces.push({ ...space , follow : action.follow })
                }else{
                    updatedSpaces.push({ ...space})
                }
            }
            return {
                ...state,
                loading : false,
                spaces : updatedSpaces
            }

        case actionTypes.FOLLOW_SPACE_FAILED : 
            return {...state , loading : false , error : action.error}

        case actionTypes.REMOVE_SPACE :
            updatedSpaces = state.spaces.filter( space => space._id !== action.spaceId );
            const updatedResults = state.results - 1;
            return {
                ...state ,
                spaces : updatedSpaces ,
                results : updatedResults
            }
        
        default :
            return state
    }
}

export default reducer;