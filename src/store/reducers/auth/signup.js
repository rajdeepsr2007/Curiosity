import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : false,
    error : null,
    signup : false
}

const reducer = (state=initialState , action) => {

    switch( action.type ){

        case actionTypes.SIGNUP_START :
            //console.log('dispatched')
            return {
                ...state,
                loading : true, 
                error : false
            }

        case actionTypes.SIGNUP_FAILED :
            return {
                ...state ,
                loading : false ,
                error : action.error,
                signup : false
            }


        case actionTypes.SIGNUP_SUCCESS :
            return {
                ...state ,
                loading : false ,
                error : false ,
                signup : true
            }

        case actionTypes.RESET_SIGNUP : 
            return {
                ...state,
                signup : false
            }
            
        default : 
            return {
                ...state
            }

    }
}

export default reducer;