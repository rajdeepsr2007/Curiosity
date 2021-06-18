import React from 'react';
import { Delete } from '@material-ui/icons';
import classes from './delete-button.module.css';

const DeleteButton = (props) => {
    return (
        <span 
        className={classes.button}
        onClick={props.onClick}
        >
            <Delete />
        </span>
    )
}

export default DeleteButton;