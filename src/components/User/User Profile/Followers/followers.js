import React from 'react';
import UserGrid from '../../User Grid/user-grid';

const UserFollowers = (props) => {
    const { user , token }=props;
    const filter={followers : [user._id]}
    return(
        <UserGrid
        filter={filter}
        load
        token={token}
        />
    )
}

export default UserFollowers;