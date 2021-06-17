import React  from 'react';
import { Fragment } from 'react';
import QuestionCard from './QuestionCard/question-card';
import {Create} from '@material-ui/icons';
import Loader from '../../UI/Loader/loader';
import classes from './question-grid.module.css';

const QuestionGrid = (props) => {

    const {questions} = props;

    if( props.loading ){
        <Loader />
    }

    let content = <div className={classes.questions} >
        <Create /> 
        <span className={classes.label}>No {props.withAnswer ? 'Answers' : 'Questions'}</span>
    </div>

    if( questions && questions.length > 0 ){
        content = questions.map( question => {
            return <QuestionCard 
                    key={Math.random()*1000000}
                    question={question} 
                    showAnswerButton
                    showAnswerCard={!props.showAnswerCard}
                    showAllAnswer={!props.showAllAnswer}
                    style={props.style}
                    />
        } )
    }
    
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default QuestionGrid;