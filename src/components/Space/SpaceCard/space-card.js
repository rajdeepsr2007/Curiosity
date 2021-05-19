import React from 'react';
import classes from './space-card.module.css';

const SpaceCard = (props) => {

    const space = {
        title : 'Title',
        topic : {
            title : 'Topic'
        }
    }

    return (
        <div className={classes.card} >
            <div className={classes.header} >
                <div className={classes.background}>
                    <img src="" />
                </div>
                <h3>{space.title}</h3>
                <h5>{space.topic.title}</h5>
            </div>
        </div>
    )
}

export default SpaceCard;