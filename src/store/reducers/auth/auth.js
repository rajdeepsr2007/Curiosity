import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : false,
    error : null ,
    token : null ,
    username : null ,
    email : null ,
    firstLogin : false,
    user : null
}

const reducer = (state=initialState , action) => {

    switch( action.type ){

        case actionTypes.LOGIN_START :
            return { ...state, loading : true, error : null }

        case actionTypes.LOGIN_SUCCESS :
            return { 
                ...state, 
                loading : false ,
                token : action.token ,
                username : action.username ,
                email : action.email ,
                firstLogin : action.firstLogin,
                user : action.user
            }
        
        case actionTypes.LOGIN_FAILED :
            return {
                ...state, 
                loading : false,
                error : action.error
            }

        case actionTypes.LOGOUT :
            return {
                ...state ,
                token : null ,
                username : null ,
                email : null ,
                user : null
            }

        default : 
            return {
                ...state
            }
    }

}

export default reducer;