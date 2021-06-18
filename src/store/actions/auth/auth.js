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

export const loginSuccess = (email ,username, token ,firstLogin,user) => {
    return {
        type : actionTypes.LOGIN_SUCCESS,
        email,
        username,
        token,
        firstLogin,
        user
    }
}

export const login = (email,password) => {
    return dispatch => {
        dispatch( loginStart() );
        axiosInstance.post('/api/auth/login' , { email : email , password : password })
        .then( response => {
            if( response ){
                if(response.data.success){
                    localStorage.setItem( 'token' , response.data.token );
                    localStorage.setItem( 'username' , response.data.username );
                    localStorage.setItem( 'email' , response.data.email )
                    dispatch(loginSuccess(response.data.email,response.data.username,response.data.token,response.data.firstLogin,response.data.user))
                }else{
                    dispatch(loginFailed(response.data.message))
                }
            }else{
                dispatch(loginFailed())
            }
            
        } )
        .catch( error => {
            dispatch(loginFailed(error.message))
        })
    }
}

export const loginAuto = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if( token ){
            axiosInstance.get('/api/auth/auto-login' , {
                headers : {
                    "Authorization" : "Bearer " + token
                }
            })
            .then( response => {
                if( response ){
                    if( response.data.success ){
                        localStorage.setItem( 'token' , response.data.token );
                        localStorage.setItem( 'username' , response.data.username );
                        localStorage.setItem( 'email' , response.data.email )
                        dispatch(
                            loginSuccess(
                                response.data.email ,
                                response.data.username,
                                response.data.token,
                                null,
                                response.data.user
                            )
                        )
                    }
                }
            } )
            .catch( error => {
                console.log('Auto login failed');
            } )
        }
    }
}

const logoutSuccess = () => {
    return{
        type : actionTypes.LOGOUT,
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        dispatch(logoutSuccess())
    }
}