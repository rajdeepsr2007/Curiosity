import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    loading : false ,
    error : null ,
    users : null ,
    filter : null ,
    results : 0
}

const reducer = (state=initialState , action) => {
    let updatedUsers;
    switch( action.type ){
        case actionTypes.LOAD_USERS_START : 
            return {
                ...state ,
                loading : true ,
                error : null ,
            }

        case actionTypes.LOAD_USERS_SUCCESS :
            return {
                loading : false ,
                users : action.users ,
                filter : action.filter ,
                results : action.results
            }

        case actionTypes.LOAD_USERS_FAILED :
            return {
                loading : false,
                error : action.error
            }

        case actionTypes.FOLLOW_USER_START :
            return {
                ...state ,
                loading : {
                    type : 'following',
                    userId : action.userId
                },
                error : null 
            }

        case actionTypes.FOLLOW_USER_SUCCESS :
            updatedUsers = [];
            for( const user of state.users ){
                const updatedUser = {...user};
                if( user._id === action.userId ){
                    updatedUser.follow = !user.follow
                }
                updatedUsers.push( updatedUser );
            }
            return {
                ...state ,
                loading : false ,
                users : updatedUsers
            }

        case actionTypes.REMOVE_USER :
            updatedUsers = state.users.filter(user => user._id !== action.userId)
            const updatedResults = state.results - 1;
            return {
                ...state,
                users : updatedUsers ,
                results : updatedResults
            }

        default :
            return state
    }
}

export default reducer;