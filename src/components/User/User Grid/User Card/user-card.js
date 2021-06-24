import React , { Component } from 'react';
import { Fragment } from 'react';
import classes from './user-card.module.css';
import baseURL from '../../../../baseURL';
import { Button } from '@material-ui/core';
import { Check , Add } from '@material-ui/icons';
import Loader from '../../../UI/Loader/loader';
import {Link} from 'react-router-dom';

const UserCard = (props) => {

    const {user , puser } = props;
    const picture = baseURL + user.picture;
    const buttonText = user.follow ? ' Following' : ' Follow';
    let followButton = !props.following ?  (
                                                <Button variant={user.follow?'contained' : 'outlined'} color='primary' onClick={() => props.onFollowUser(user._id)} >
                                                    {user.follow ? <Check /> : <Add />}{buttonText}
                                                </Button>
                                            ) : <Loader />
    if( puser._id === user._id ){
        followButton = 
            <Link to={`/user/${user._id}`} >
                <Button variant='outlined' color='primary' >
                    View Profile
                </Button>      
            </Link>
    }
    
    const content = (
        <Fragment>
            <Link to={`/user/${user._id}/followers`} >
                <div className={classes.label} >
                    <img src={picture} />
                    {user.username}
                </div>
            </Link>
            <div className={classes.info} >
                <Link to={`/user/${user._id}/followers`} ><span>{ user.followers.length } Followers</span></Link>
                <Link to={`/user/${user._id}/questions`} ><span>{ user.questions.length } Questions</span></Link>
                <Link to={`/user/${user._id}/answers`} ><span>{ user.answers.length } Answers</span></Link>    
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