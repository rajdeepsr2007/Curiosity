import React from 'react';
import baseURL from '../../../baseURL';
import classes from './topic.module.css';

const Topic = (props) => {
    const {topic} = props;

    const topicClasses = [classes.topic]

    if( topic.selected ){
        topicClasses.push(classes.selected)
    }

    const style = topic.selected ?  {
                        opacity : '60%'
                  } : null

    return (
        <div className={topicClasses.join(' ')} onClick={props.onClick} style={style} >
                <img src={`${baseURL}${topic.image}`} alt={topic.title} />
                <div className={classes.title} >
                    {topic.title}
                </div>
        </div>
    )
}

export default Topic;