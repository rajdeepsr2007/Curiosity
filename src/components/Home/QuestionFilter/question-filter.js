import React from 'react';
import { Fragment } from 'react';
import { Button } from '@material-ui/core';
import baseURL from '../../../baseURL';
import classes from './question-filter.module.css';
import Backdrop from '../../UI/Modal/Backdrop/backdrop';

const QuestionFilter = (props) => {

    const {topics , spaces} = props; 

    const topicsList = topics.map( topic => {
        const topicClasses = [classes.label];
        topic.selected ?  topicClasses.push(classes.selected) : null;
        return (
            <span key={topic._id} className={topicClasses.join(' ')} onClick={() => props.onChange('topic',topic._id)}  >
                <img src={baseURL + topic.image} />
                <span>{topic.title}</span>
            </span>
        )
    } )

    const spacesList = spaces.map( space => {
        const spaceClasses = [classes.label];
        space.selected ? spaceClasses.push(classes.selected) : null;
        return (
            <span key={space._id} className={spaceClasses.join(' ')} onClick={() => props.onChange('space',space._id)}  >
                <img src={baseURL + space.background} />
                <span>{space.title}</span>
            </span>
        )
    } )

    return (
        <Fragment>
            <Backdrop onClick={props.onClick} show />
            <div className={classes.filter} >
                {topicsList}
                {spacesList}
                <div className={classes.button} >
                    <Button variant="contained" color="primary">
                        Save
                    </Button>
                </div>
            </div>
        </Fragment>
        
    )
}

export default QuestionFilter;