import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';
import {compareFilters} from '../util/util';

export const loadSpacesStart = () => {
    return {
        type : actionTypes.LOAD_SPACES
    }
}

export const loadSpacesSuccess = (spaces , filter) => {
    return {
        type : actionTypes.LOAD_SPACES_SUCCESS,
        spaces : spaces,
        filter : filter
    }
}

export const loadSpacesFailed = (error) => {
    return {
        type : actionTypes.LOAD_SPACES_FAILED,
        error : error
    }
}

export const loadSpaces = (token,filter) => {
    return (dispatch , getState) => {
        const alreadySetFilter = getState().spaces.filter;
        let spaces = getState().spaces.spaces ?  getState().spaces.spaces : [] ;
        const refresh = !compareFilters( alreadySetFilter , filter , [] );
        const startRange = refresh ? 0 : spaces.length;
        dispatch(loadSpacesStart())
        axiosInstance.post('/api/spaces/get-spaces',{ filter : filter , startRange },{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if(response){
                if( refresh ){
                    spaces = response.data.spaces
                }else{
                    for( let i = 0 ; i < response.data.spaces.length ; i++ ){
                        spaces.push(response.data.spaces[i]);
                    }
                }
                dispatch(loadSpacesSuccess(spaces , filter))
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

export const followSpace = (token,spaceId,filter) => {
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