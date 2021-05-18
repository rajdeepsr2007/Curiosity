import React , { Fragment } from 'react';
import Backdrop from '../../UI/Modal/Backdrop/backdrop';
import classes from './sidebar.module.css'

const Sidebar = (props) => {

    return (
        <Fragment>
            <Backdrop show={true} onClick={props.onClick} />
            <div className={classes.sidebar} onClick={props.onClick}  >
                
            </div>
        </Fragment>
        
    )
}

export default Sidebar;