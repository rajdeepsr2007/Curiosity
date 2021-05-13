import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import classes from './alert.module.css'

const Alert = (props) => {
    const alertClass = [classes.alert];
    const { alertType , text , size } = props;
    
    if( alertType === 'success' ){
        alertClass.push( classes.success )
    }else{
        alertClass.push( classes.error )
    }

    if( size === 'big' ){
        alertClass.push( classes.big )
    }

     const icon = alertType === 'success' ? <CheckCircleIcon /> : <ErrorOutlineIcon /> ;

    return (
        <div className={alertClass.join(' ')} >
            {icon}{text}
        </div>
    )
}

export default Alert;