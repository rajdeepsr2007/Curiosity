import React , { Fragment } from 'react';
import {Select,MenuItem,InputLabel, FormControl} from '@material-ui/core';

const Dropdown = (props) => {

    const wrapperStyle = {
        width : props.width ? props.width : '80%' ,
    }

    return (
        <Fragment>
            <FormControl variant="outlined" style={wrapperStyle} >
                <Select
                labelId="dropdown"
                value={props.value}
                style={{ width : '100%' ,margin : '1rem 0' }}
                onChange={props.onChange}
                >
                    <MenuItem value="-" disabled>
                        {props.label}
                    </MenuItem>
                    {
                        props.options ? props.options.map( option => {
                            return (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.title}
                                </MenuItem>
                            )
                        } ) : null
                    }
                </Select>   
            </FormControl>
        </Fragment>
    )
}

export default Dropdown;