import React , { Component } from 'react';
import { Fragment } from 'react';
import QuestionCard from './QuestionCard/question-card';

const QuestionGrid = (props) => {

    const {questions} = props;
    const questionList = questions.map( question => {
        return <QuestionCard 
                key={Math.random()*100000}
                question={question} 
                showAnswerButton
                />
    } )

    return (
        <Fragment>
            {questionList}
        </Fragment>
    )
}

export default QuestionGrid;