import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : true ,
    error : null ,
    spaces : null, 
}

const reducer = (state=initialState , action) => {
    switch( action.type ){
        case actionTypes.LOAD_SPACES : 
            return {...state , loading : true , error : null  , spaces : null }

        case actionTypes.LOAD_SPACES_SUCCESS : 
            return {...state , loading :false , spaces : action.spaces }

        case actionTypes.LOAD_SPACES_FAILED : 
            return {...state , loading : false , error : action.error}

        case actionTypes.FOLLOW_SPACE :
            return {
                ...state ,
                //followProgress : [...state.followProgress , action.spaceId]
            }

        case actionTypes.FOLLOW_SPACE_SUCCESS : 
            const updatedSpaces = [];
            for(let space of state.spaces){
                if( JSON.stringify(space._id) === JSON.stringify(action.spaceId) ){
                    updatedSpaces.push({ ...space , follow : action.follow })
                }else{
                    updatedSpaces.push({ ...space})
                }
            }
            return {
                ...state,
                spaces : updatedSpaces
            }

        case actionTypes.FOLLOW_SPACE_FAILED : 
            return {...state , error : action.error}
        
        default :
            return state
    }
}

export default reducer;