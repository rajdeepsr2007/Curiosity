import React from 'react';
import Following from '../../../../containers/Following/following';
import classes from './following.module.css';

const UserFollowing = (props) => {
    const {user}=props;
    return(
        <div className={classes.wrapper} >
            <div className={classes.following} >
                <Following 
                puser={user} 
                />
            </div>
        </div>     
    )
}

export default UserFollowing;