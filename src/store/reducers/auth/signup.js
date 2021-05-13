import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : false,
    error : null
}

const reducer = (state=initialState , action) => {

    switch( action.type ){

        case actionTypes.SIGNUP_START :
            console.log('dispatched')
            return {
                ...state,
                loading : true
            }
        default : 
            return {
                ...state
            }

    }
}

export default reducer;