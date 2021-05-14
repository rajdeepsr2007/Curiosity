import * as actionTypes from '../actionTypes';
import axiosInstance from '../../../axiosInstance'

export const signupStart = () => {
    return {
        type : actionTypes.SIGNUP_START
    }
}

const signupSuccess = () => {
    return {
        type : actionTypes.SIGNUP_SUCCESS
    }
}

const signupFailed = (error) => {
    return {
        type : actionTypes.SIGNUP_FAILED,
        error : error
    }
}

export const signUp = (email , username , password) => {
    return dispatch => {
        dispatch(signupStart());
        const user = { email , username , password }

        //dispatch(signupFailed());
        axiosInstance.post('/api/auth/signup' , user )
        .then( response => {
            console.log(response)
            if(response.data.success){
                dispatch(signupSuccess())
            }else{
                dispatch(signupFailed( response.data.message ))
            }
        } )
        .catch( error => {
            dispatch(signupFailed(error.message))
        })
    }
}

export const resetSignup = () => {
    return {
        type : actionTypes.RESET_SIGNUP
    }
}