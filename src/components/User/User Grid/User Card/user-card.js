import React , { Component } from 'react';
import { Fragment } from 'react';
import classes from './user-card.module.css';
import baseURL from '../../../../baseURL';
import { Button } from '@material-ui/core';
import { Check , Add } from '@material-ui/icons';
import Loader from '../../../UI/Loader/loader';
import {Link} from 'react-router-dom';

const UserCard = (props) => {

    const {user} = props;
    const picture = baseURL + user.picture;
    const buttonText = user.follow ? ' Following' : ' Follow';
    const followButton = !props.following ?  (
                                                <Button variant={user.follow?'contained' : 'outlined'} color='primary' onClick={() => props.onFollowUser(user._id)} >
                                                    {user.follow ? <Check /> : <Add />}{buttonText}
                                                </Button>
                                            ) : <Loader />
    const content = (
        <Fragment>
            <Link to={`/user/${user._id}`} >
                <div className={classes.label} >
                    <img src={picture} />
                    {user.username}
                </div>
            </Link>
            <div className={classes.info} >
                <span>{ user.followers.length } Followers</span>
                <span>{ user.questions.length } Questions</span>
                <span>{ user.answers.length } Answers</span>    
            </div>
            {followButton}
        </Fragment>
        
    )

    return (
        <div className={classes.user} >
            {content}
        </div>
    )
}

export default UserCard;