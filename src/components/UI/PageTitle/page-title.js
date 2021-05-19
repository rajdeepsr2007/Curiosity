import React from 'react';
import classes from './page-title.module.css'

const PageTitle = (props) => {
    return (
        <h2 className={classes.pagetitle}>
            {props.children}
        </h2>
    )
}

export default PageTitle;