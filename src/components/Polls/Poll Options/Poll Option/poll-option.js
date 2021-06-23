import { Cancel } from '@material-ui/icons';
import React from 'react';
import classes from './poll-option.module.css';

const PollOption = (props) => {
    const {option , label , onRemoveOption , onVote , selected} = props;
    const removeOptionButton = onRemoveOption ?
                               <span
                               className={classes.remove}
                               onClick={() => onRemoveOption(
                                   option._id
                               )}
                               >
                                   <Cancel />
                                </span>
                               :null
    
    const optionClasses = [classes.option];
    if( selected === option._id ){
        optionClasses.push(classes.selected);
    }

    const percentage = (
        <div className={classes.percentagedisplay} >
            {props.percentage}%
        </div>
    )

    return(
        <div 
        className={optionClasses.join(' ')}
        onClick={
            onVote ? 
            () => onVote(option._id)
            : () => {}
        }
        >
            <div className={classes.info} >
                <span className={classes.label}>
                        {label}
                    </span>
                    <span 
                    className={classes.title} 
                    >
                        {option.title}
                </span>
            </div>
            <div className={classes.percentage} style={{ 
                width : `${props.percentage}%` 
                }} >
            </div>  
            {removeOptionButton}
            {percentage}
        </div>
    )
}

export default PollOption;