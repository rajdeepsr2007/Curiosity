import { Button } from '@material-ui/core';
import React from 'react';
import defaultBackground from './background.webp';
import { Check } from '@material-ui/icons'
import classes from './space-card.module.css';
import baseURL from '../../../baseURL';

const SpaceCard = (props) => {

    const { space } = props;

    let image = defaultBackground;

    if( space.image){
        if(space.image[0] === '/' || space.image[0] === '\\'){
            image = baseURL + space.image
        }else{
            image = space.image;
        }
    }

    return (
        <div className={classes.card} >
                <div className={classes.background}>
                    <img src={image} alt="background" />
                </div>
                <div className={classes.info} >
                    <span className={classes.label}>{'0 Questions'}</span>
                    <span className={classes.label}>{'0 Followers'}</span>
                    <Button
                    variant="outlined"
                    color="primary"
                    onClick={props.onClick}>
                    {space.follow ? <Check /> : <Check /> }
                        Follow
                    </Button> 
                </div>
                <div className={classes.about} >
                    <h3>{space.title}</h3>
                    <h5>{space.topic.title}</h5>
                </div>
        </div>
    )
}

export default SpaceCard;