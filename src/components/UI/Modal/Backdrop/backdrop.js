import React from 'react';
import classes from './backdrop.module.css';

const Backdrop = (props) => {

    const backdropClasses = [classes.backdrop];

    if(!props.show){
        backdropClasses.push(classes.hide);
    }

    return (
        <div className={backdropClasses.join(' ')} onClick={props.onClick} >
            {props.children}
        </div>
    )
}

export default Backdrop;
