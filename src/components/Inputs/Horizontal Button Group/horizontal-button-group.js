import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './horizontal-button-group.module.css';

const HorizontalButtonGroup = (props) => {

    const {buttons} = props;

    let buttonGroup = buttons.map( button => {
        return (
            <NavLink
            key={button.to}
            to={button.to}
            exact
            activeClassName={classes.active}
            >{button.title}</NavLink>
        )
    } )

    return (
        <div className={classes.navigation} >
            {buttonGroup}        
        </div>
    )
}

export default HorizontalButtonGroup;