import React from 'react';
import defaultBackground from './background.webp';
import { Add, Check } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Loader from '../../../UI/Loader/loader';
import {Link} from 'react-router-dom';
import classes from './space-card.module.css';
import baseURL from '../../../../baseURL';

const SpaceCard = (props) => {

    const { space } = props;

    let background = defaultBackground;

    if( space.background){
        if(space.background[0] === '/' || space.background[0] === '\\'){
            background = baseURL + space.background
        }else{
            background = space.background;
        }
    }

    const infoStyle = {
        opacity : '90%'
    }
    const backgroundStyle = {
        opacity : '80%'
    }

    let followButton = space.follow ? <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => props.followSpaceHandler(space._id)}>
                                        <Check />
                                            Following
                                        </Button> : 
                                        <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => props.followSpaceHandler(space._id)}>
                                        <Add />
                                            Follow
                                        </Button>
    if( props.followLoading === true ){
        followButton = <div className={classes.Loader} >
                            <Loader />
                        </div>
    }

    return (
        <div className={classes.card} style={props.style}  >
                <div className={classes.background}  style={backgroundStyle}>
                    <img src={background} alt="background"/>
                </div>
                <div className={classes.info} style={infoStyle}  >

                    <Link to={`/spaces/${space._id}/questions`} style={{textDecoration : 'none'}} >
                        <span 
                        className={classes.label} 
                        >
                            {space.questions.length + ' Questions'}
                        </span>
                    </Link>
                    <Link to={`/spaces/${space._id}/followers`} style={{textDecoration : 'none'}} >
                        <span className={classes.label}>{space.followers.length + ' Followers'}</span>
                    </Link>
                    { followButton }
                </div>
                <div className={classes.about} >
                    <h3>{space.title}</h3>
                    <h5>{space.topic.title}</h5>
                </div>
        </div>
    )
}

export default SpaceCard;