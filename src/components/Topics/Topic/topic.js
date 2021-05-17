import React from 'react';
import baseURL from '../../../baseURLStatic';
import classes from './topic.module.css';

const Topic = (props) => {
    const {topic} = props;

    const topicClasses = [classes.topic]

    if( topic.selected ){
        topicClasses.push(classes.selected)
    }

    return (
        <div className={topicClasses.join(' ')} onClick={props.onClick} >
                <img src={`${baseURL}${topic.image}`} alt={topic.title} />
                <div className={classes.title} >
                    {topic.title}
                </div>
        </div>
    )
}

export default Topic;