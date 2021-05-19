import React from 'react';
import {NativeSelect} from '@material-ui/core';

const Dropdown = (props) => {
    return (
        <NativeSelect
                    id="demo-customized-select-native"
                    style = {{width : '100%' , margin : '2rem auto' , fontSize : '1.2rem'}}
                    label={props.label}
                    onChange={props.onChange}
                    >
                    <option value="">{props.label}</option>
                    {
                        props.options ? props.options.map( option => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.title}
                                </option>
                            )
                        } ) : null
                    }
        </NativeSelect>    
    )
}

export default Dropdown;