import React from 'react';
import { Fragment } from 'react';
import { Button } from '@material-ui/core';
import baseURL from '../../../baseURL';
import classes from './question-filter.module.css';
import ScrollableModal from '../../UI/Scrollable Modal/scrollable-modal';

const QuestionFilter = (props) => {

    const {topics , spaces} = props; 

    const topicsList = topics.map( topic => {
        const topicClasses = [classes.label];
        topic.selected ?  topicClasses.push(classes.selected) : null;
        return (
            <span key={topic._id} className={topicClasses.join(' ')} onClick={() => props.onChange('topic',topic._id)}  >
                <img src={baseURL + topic.image} alt={topic.title} />
                <span>{topic.title}</span>
            </span>
        )
    } )

    const spacesList = spaces.map( space => {
        const spaceClasses = [classes.label];
        space.selected ? spaceClasses.push(classes.selected) : null;
        return (
            <span key={space._id} className={spaceClasses.join(' ')} onClick={() => props.onChange('space',space._id)}  >
                <img src={baseURL + space.background} alt={space.title}/>
                <span>{space.title}</span>
            </span>
        )
    } )

    const saveButton = (
        <div className={classes.button} onClick={props.onApplyFilter} >
            <Button variant="contained" color="primary">
                Save
            </Button>
        </div>
    )

    return (
        <Fragment>
            <ScrollableModal 
            show 
            onClick={props.onClick} 
            title={'Filters'}
            >
                <div className={classes.filter}>
                    {topicsList}
                    {spacesList}
                    {saveButton}
                </div>
            </ScrollableModal>
        </Fragment>
        
    )
}

export default QuestionFilter;