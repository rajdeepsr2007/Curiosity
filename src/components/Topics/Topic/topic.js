import React from 'react';
import classes from './topic.module.css'

const Topic = (props) => {
    const {topic} = props;

    const topicClasses = [classes.topic]

    if( topic.selected ){
        topicClasses.push(classes.selected)
    }

    return (
        <div className={topicClasses.join(' ')} onClick={props.onClick} >
            {topic.description}
        </div>
    )
}

export default Topic;