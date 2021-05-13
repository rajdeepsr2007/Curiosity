import { Button } from '@material-ui/core';
import React from 'react';
import Backdrop from './Backdrop/backdrop';
import classes from './modal.module.css';

const Modal = (props) => {

    const modalClasses = [classes.modal];

    if( !props.show ){
        modalClasses.push(classes.hide);
    }

    return <Backdrop show={props.show} onClick={props.onClick} >
        <div className={modalClasses.join(' ')}>
            {props.error}
            <Button variant="outlined" color="primary">
                Ok
            </Button>
        </div>
    </Backdrop>
}

export default Modal;