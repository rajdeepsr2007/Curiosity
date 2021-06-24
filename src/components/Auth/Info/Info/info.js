import React from 'react';
import classes from './info.module.css'

const Info = (props) => {

    const style = {
        opacity : '80%'
    }

    return (
        <div className={classes.info} style={style} >
            {props.info.description}
        </div>
    )
}

export default Info;