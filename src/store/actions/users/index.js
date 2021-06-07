import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../../actions/actionTypes';
import { compareFilters } from '../util/util';

const loadUsersStart = () => {
    return {
        type : actionTypes.LOAD_USERS_START
    }
}

const loadUsersSuccess = (users,filter,results) => {
    return {
        type : actionTypes.LOAD_USERS_SUCCESS,
        users ,
        filter ,
        results
    }
}

const loadUsersFailed = (error) => {
    return {
        type : actionTypes.LOAD_USERS_FAILED,
        error
    }
}

export const loadUsers = (token , filter) => {
    return (dispatch , getState) => {
        dispatch( loadUsersStart() );
        const alreadySetFilter = getState().users.filter;
        let users = getState().users.users ? getState().users.users : [];
        const refresh = !compareFilters(alreadySetFilter , filter , ['space_followers'] );
        const startRange = refresh ? 0 : users.length;
        axiosInstance.post('/api/user/get-users',{ filter , startRange },{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if( response ){
                if( refresh ){
                    users = response.data.users;
                }else{
                    for( const user of response.data.users ){
                        users.push( user )
                    }
                }
                dispatch( loadUsersSuccess(users,filter,response.data.results) );
            }else{
                dispatch( loadUsersFailed('Network Error') )
            }
        } )
        .catch(error => {
            dispatch( loadUsersFailed(error.message) )
        })
    }
}

const followUserStart = (userId) => {
    return {
        type : actionTypes.FOLLOW_USER_START ,
        userId
    }
}

const followUserSuccess = (userId) => {
    return {
        type : actionTypes.FOLLOW_USER_SUCCESS,
        userId
    }
}

const followUserFailed = (userId , error) => {
    return {
        type : actionTypes.FOLLOW_USER_FAILED,
        userId ,
        error
    }
}

export const followUser = (token , userId) => {
    return dispatch => {
        dispatch( followUserStart(userId) )
        axiosInstance.post('/api/user/follow',{ userId },{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if( response ){
                dispatch(followUserSuccess(userId));
            }
        } )
    }
}