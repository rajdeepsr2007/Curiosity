import React from 'react';
import {TextField} from '@material-ui/core';

const TitleInput = (props) => {

    const wrapperStyle = { 
        height : '3rem' ,
        width : props.width ? props.width : '80%' ,
        margin : '2rem auto' ,
        fontWeight : 'bolder' ,
    }

    return (
        <TextField 
                style={wrapperStyle}
                label={props.label}
                value={props.value}
                variant="outlined"
                inputProps={{
                    style: {
                      height : '3rem',
                      padding: '0 14px',
                      fontSize : '1.2rem',
                      width : '100%'
                 }}}
                onChange={props.onChange} 
        />
    )
}

export default TitleInput;