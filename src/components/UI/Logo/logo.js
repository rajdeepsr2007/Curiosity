import React from 'react';
import Icon from '../../../assets/images/logo.png'
import classes from './logo.module.css'

const Logo = () => {
    return (
        <div className={classes.logo}>
            <img src={Icon} alt="Logo" />
        </div>
    )
}

export default Logo;