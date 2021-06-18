import React from 'react';
import { Fragment } from 'react';
import baseURL from '../../../baseURL';
import { formatDateExact } from '../../util/util';
import ReadOnlyEditor from '../../Inputs/Read Only Editor/read-only-editor';
import classes from './user-box.module.css';
import { Add, Check, Create } from '@material-ui/icons';
import {Button} from '@material-ui/core';
import Loader from '../../UI/Loader/loader';
import { Link } from 'react-router-dom';

const UserBox = (props) => {
    const {user} = props;
    const picture = baseURL + user.picture;

    let followButton = null;
    if( props.following ){
        followButton = <Loader />
    }else if( props.user._id !== props.puser._id ){
        followButton = (
            <Button variant={user.follow ? 'contained' : 'outlined'} color="primary" onClick={props.onFollowUser} >
                <div style={{ fontSize : '0.8rem' , display : 'flex' , justifyContent : 'center' , alignItems : 'space-between'}} >
                    {user.follow ? <Check /> : <Add />}
                    {user.follow ? 'Following' : 'Follow'}
                </div>
            </Button>
        )
    }else{
        followButton = <Link to='/user/edit-topics' >
            <Button variant='outlined' color='primary'>
                <Create />Edit Topics
            </Button>
        </Link>
    }

    const content = (
        <div className={classes.user} >
            <div className={classes.label} >
                <img src={picture} alt={user.username} />
                <div className={classes.info} >
                    <span className={classes.username} >{user.username}</span>
                    <span className={classes.date} >Joined <b>{formatDateExact(user.createdAt)}</b></span>
                    {followButton}
                </div>
            </div>
            
            <div className={classes.about} >
                <h4>About</h4>
                <ReadOnlyEditor
                rawContent={user.description}
                />
                {
                    props.puser && props.puser._id === props.user._id ?
                    <div className={classes.options}>
                        <Link to='/user/edit-picture'>
                            <div>
                                <Create /> Picture
                            </div>
                        </Link>
                        <Link to='/user/edit-description'>
                            <div>
                                <Create /> About
                            </div>
                        </Link>
                    </div>
                    : null
                }
            </div>
        </div>
    )

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default UserBox;