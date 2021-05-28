import React , { Component } from 'react';
import { Fragment } from 'react';
import QuestionCard from './QuestionCard/question-card';
import {Create} from '@material-ui/icons';
import classes from './question-grid.module.css';

const QuestionGrid = (props) => {

    const {questions} = props;

    let content = <div className={classes.questions} >
        <Create /> 
        <span className={classes.label}>No Questions</span>
    </div>

    if( questions && questions.length > 0 ){
        content = questions.map( question => {
            return <QuestionCard 
                    key={Math.random()*1000000}
                    question={question} 
                    showAnswerButton
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