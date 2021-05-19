import React , { Fragment } from 'react';
import {Select,MenuItem,InputLabel} from '@material-ui/core';

const Dropdown = (props) => {
    return (
        <Fragment>
            <Select
            labelId="dropdown"
            value={props.value}
            style={{ width : '100%' ,margin : '2rem 0' }}
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
        </Fragment>
    )
}

export default Dropdown;