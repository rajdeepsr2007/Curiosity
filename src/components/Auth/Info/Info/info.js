import React from 'react';
import classes from './info.module.css'

const Info = (props) => {
    return (
        <div className={classes.info} >
            {props.info.description}
        </div>
    )
}

export default Info;