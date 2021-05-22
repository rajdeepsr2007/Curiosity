import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';

export const loadSpacesStart = () => {
    return {
        type : actionTypes.LOAD_SPACES
    }
}

export const loadSpacesSuccess = (spaces) => {
    return {
        type : actionTypes.LOAD_SPACES_SUCCESS,
        spaces : spaces
    }
}

export const loadSpacesFailed = (error) => {
    return {
        type : actionTypes.LOAD_SPACES_FAILED,
        error : error
    }
}

export const loadSpaces = (token) => {
    return dispatch => {
        dispatch(loadSpacesStart())
        axiosInstance.get('/api/spaces/get-spaces',{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if(response){
                dispatch(loadSpacesSuccess(response.data.spaces))
            }else{
                dispatch(loadSpacesFailed('Network Error'))
            }
        } )
        .catch(error => {
            dispatch(loadSpacesFailed(error.message))
        })
    }
}

const followSpaceStart = (spaceId) => {
    return {
        type : actionTypes.FOLLOW_SPACE,
        spaceId : spaceId
    }
}

const followSpaceSuccess = (spaceId , followed) => {
    return {
        type : actionTypes.FOLLOW_SPACE_SUCCESS,
        spaceId : spaceId,
        follow : followed
    }
}

const followSpaceFailed = (spaceId , error) => {
    return {
        type : actionTypes.FOLLOW_SPACE_FAILED,
        spaceId : spaceId ,
        error : error
    }
}

export const followSpace = (token,spaceId) => {
    return dispatch => {
        dispatch(followSpaceStart(spaceId))
        axiosInstance.post('/api/spaces/follow',{ spaceId : spaceId },{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if(response){
                console.log(response);
                dispatch(followSpaceSuccess(spaceId , response.data.followed ))
            }else{
                dispatch(followSpaceFailed( spaceId , 'Network error' ));
            }
        } )
        .catch(error => {
            dispatch(followSpaceFailed( spaceId , error.message ));
        })
    }
} 