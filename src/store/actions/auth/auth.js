import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';

export const loginStart = () => {
    return {
        type : actionTypes.LOGIN_START
    }
}

export const loginFailed = (error) => {
    return {
        type : actionTypes.LOGIN_FAILED,
        error : error
    }
} 

export const loginSuccess = (email ,username, token) => {
    return {
        type : actionTypes.LOGIN_SUCCESS,
        email,
        username,
        token
    }
}

export const login = (email,password) => {
    return dispatch => {
        dispatch( loginStart() );
        axiosInstance.post('/api/auth/login' , { email : email , password : password })
        .then( response => {
            if(response){
                dispatch(loginSuccess(response.email,response.username,response.token))
            }else{
                dispatch(loginFailed())
            }
        } )
        .catch( error => {
            dispatch(loginFailed(error.message))
        })
    }
}