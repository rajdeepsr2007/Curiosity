import React from 'react';
import { CircularProgress } from '@material-ui/core';
import classes from './loader.module.css'

const Loader = () => {
    return (
        <div className={classes.loader} >
            <CircularProgress />
        </div>
    )
}

export default Loader;