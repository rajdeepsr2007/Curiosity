import React , { Component , Fragment } from 'react';
import Alert from '../../UI/Feedback/Alert/alert';
import Loader from '../../UI/Loader/loader';
import {connect} from 'react-redux';
import { Person } from '@material-ui/icons';
import UserCard from './User Card/user-card';
import * as actions from '../../../store/actions/index';
import {Button} from '@material-ui/core';
import classes from './user-grid.module.css';

class UserGrid extends Component{

    state = {
        filter : this.props.filter
    }

    onFollowUserHandler = (userId) => {
        if(!this.props.loading){
            this.props.onFollowUser(
                this.props.token ,
                userId
            )
        }
    }

    loadUsersHandler = () => {
        if(!this.props.loading){
            this.props.onLoadUsers(
                this.props.token ,
                this.state.filter
            )
        }
    }

    render(){

        if( this.props.loading && !this.props.loading.userId ){
            return <Loader />
        }

        if( this.props.error ){
            return <Alert alertType='error' size='big' text={this.props.error} />
        }

        if( !this.props.users || this.props.users.length < 1 ){
            return <div className={classes.users} >
                <Person /> No Users
            </div>
        }

        const users = this.props.users.map( user => {
            return (
                <UserCard
                key={user._id}
                user={user}
                following={this.props.loading && this.props.loading.userId && this.props.loading.userId === user._id}
                onFollowUser={this.onFollowUserHandler}
                />
            )
        } )

        let loadMoreButton = null;

        if( this.props.users.length < this.props.results ){
            loadMoreButton = <div style={{ margin : '2rem 0' }} >
                <Button variant="contained" color="primary" onClick={this.loadUsersHandler}>
                    Load More
                </Button>
            </div>
        }

        return(
            <Fragment>
                {users}
                {loadMoreButton}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading : state.users.loading,
        error : state.users.error,
        token : state.auth.token ,
        results : state.users.results ,
        users : state.users.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFollowUser : (token , userId) => dispatch(actions.followUser(token , userId)),
        onLoadUsers : (token , filter) => dispatch(actions.loadUsers(token , filter))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserGrid);