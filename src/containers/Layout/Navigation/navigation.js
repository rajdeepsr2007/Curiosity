import React, { Fragment } from 'react';
import Logo from '../../UI/Logo/logo';
import classes from './navigation.module.css';
import TextField from '@material-ui/core/TextField';

const Navigation = (props) => {

    const onlyAuthContent = props.auth ? (
       <Fragment>
            <div className={classes.search}>
                <TextField variant="outlined" size="small" label="Search" />
            </div>
            <div className={classes.controls} >
                
            </div>
       </Fragment>
    ) : null;

    return (
        <header className={classes.navigation}>
            <div className={classes.logo} >
                <Logo />
            </div>
            {onlyAuthContent} 
        </header>
    )
}

export default Navigation;