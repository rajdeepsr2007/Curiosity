import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : false ,
    error : null ,
    spaces : null,
    filter : {},
    results : 0
}

const reducer = (state=initialState , action) => {
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
                loading : false,
                spaces : updatedSpaces
            }

        case actionTypes.FOLLOW_SPACE_FAILED : 
            return {...state , loading : false , error : action.error}
        
        default :
            return state
    }
}

export default reducer;