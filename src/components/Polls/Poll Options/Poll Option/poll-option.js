import { Cancel } from '@material-ui/icons';
import React from 'react';
import classes from './poll-option.module.css';

const PollOption = (props) => {
    const {option , label , onRemoveOption} = props;
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
    return(
        <div className={classes.option} >
            <span className={classes.label}>
                {label}
            </span>
            <span className={classes.title} >
                {option.title}
            </span>
            {removeOptionButton}
        </div>
    )
}

export default PollOption;