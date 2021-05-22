import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : true ,
    error : null ,
    spaces : null
}

const reducer = (state=initialState , action) => {
    switch( action.type ){
        case actionTypes.LOAD_SPACES : 
            return {...state , loading : true , error : null  , spaces : null }

        case actionTypes.LOAD_SPACES_SUCCESS : 
            return {...state , loading :false , spaces : action.spaces }

        case actionTypes.LOAD_SPACES_FAILED : 
            return {...state , loading : false , error : action.error}
        
        default :
            return {...state}
    }
}

export default reducer;