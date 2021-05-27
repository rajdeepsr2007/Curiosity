import React , {Fragment} from 'react';
import AnswerCard from './AnswerCard/answer-card';
import { Create } from '@material-ui/icons';
import classes from './answer-grid.module.css';

const AnswerGrid = (props) => {

    const {answers} = props;

    let content = <div className={classes.answers} >
        <Create /> 
        <span className={classes.label}>No Answers Yet</span>
    </div>

    if( answers && answers.length > 0 ){
        content = answers.map( answer => {
            return (
                <AnswerCard
                key={answer._id}
                answer = {answer}
                />
            )
        })
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default AnswerGrid;