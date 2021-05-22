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

export const loadSpaces = () => {
    return dispatch => {
        dispatch(loadSpacesStart())
    }
}