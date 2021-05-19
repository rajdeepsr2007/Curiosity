import React from 'react';
import {TextField} from '@material-ui/core';

const TitleInput = (props) => {
    return (
        <TextField 
                style={{ height : '3rem' , width : '100%' , margin : '1rem auto' ,fontWeight : 'bolder' }}
                label={props.label}
                value={props.value}
                inputProps={{
                    style: {
                      height : '3rem',
                      padding: '0 14px',
                      fontSize : '1.5rem',
                      width : '100%'
                 }}}
                onChange={props.onChange} 
        />
    )
}

export default TitleInput;