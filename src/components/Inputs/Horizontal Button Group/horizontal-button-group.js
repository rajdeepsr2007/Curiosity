import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './horizontal-button-group.module.css';

const HorizontalButtonGroup = (props) => {

    const {buttons} = props;

    const navigationClass = props.colorScheme ? classes.navigationr : classes.navigation;

    let buttonGroup = buttons.map( button => {
        return (
            <NavLink
            key={button.to}
            to={button.to}
            activeClassName={classes.active}
            >{button.title}</NavLink>
        )
    } )

    return (
        <div className={navigationClass} >
            {buttonGroup}        
        </div>
    )
}

export default HorizontalButtonGroup;