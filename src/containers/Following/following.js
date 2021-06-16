import React , { Component , Fragment } from 'react';
import HorizontalButtonGroup from '../../components/Inputs/Horizontal Button Group/horizontal-button-group';
import {connect} from 'react-redux';
import Loader from '../../components/UI/Loader/loader';
import * as actions from '../../store/actions';
import SpaceGrid from '../../components/Space/Space Grid/space-grid';
import {Route,Redirect} from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle/page-title';
import { List } from '@material-ui/icons';
import UserGrid from '../../components/User/User Grid/user-grid';
import { Button } from '@material-ui/core';

class Following extends Component{
    state = {
        user : null
    }

    componentDidMount = () => {
        const user = this.props.puser ? this.props.puser : this.props.user;
        this.setState({ user : user })
        this.props.onLoadSpaces( this.props.token ,  { follow : [user._id] })
        this.props.onLoadUsers( this.props.token , { follow : [user._id] } )
    }

    loadUsersHandler = () => {
        this.props.onLoadUsers( this.props.token , { follow : [this.state.user._id] } )
    }

    loadSpacesHandler = () => {
        this.props.onLoadSpaces( this.props.token ,  { follow : [this.state.user._id] })
    }

    render(){

        if( !this.state.user ){
            return <Loader />
        }

        let Buttons;

        const user = this.state.user;
        const spacePath = this.props.puser ? `/user/${user._id}/following/spaces` : '/following/spaces';
        const usersPath = this.props.puser ? `/user/${user._id}/following/users` : '/following/users';
        
        Buttons = [
            { to : spacePath , title : `Spaces (${this.props.spaceResults})` },
            { to : usersPath , title : `Users (${this.props.usersResults})` }
        ]

        const horizontalNavigation = <HorizontalButtonGroup
                                      buttons={Buttons}
                                      colorScheme
                                      />
        let loadMoreUsersButton = null;
        let loadMoreSpacesButton = null;
        if( this.props.spaces && this.props.spaces.length < this.props.spaceResults ){
            loadMoreSpacesButton = <div style={{ margin : '2rem 0' }} >
                <Button variant="contained" color="primary" onClick={this.loadSpacesHandler}>
                    Load More
                </Button>
            </div>
        }
        if( this.props.users && this.props.users.length < this.props.usersResults ){   
            loadMoreUsersButton = <div style={{ margin : '2rem 0' }} >
                <Button variant="contained" color="primary" onClick={this.loadUsersHandler}>
                    Load More
                </Button>
            </div>
        }                             
        
        const spaces = (
            <Fragment>
                <SpaceGrid spaces={this.props.spaces} />
                {loadMoreSpacesButton}
            </Fragment>
        )

        const following = (
            <Fragment>
                <UserGrid users={this.props.users} />
                {loadMoreUsersButton}
            </Fragment>
        )

        return(
            <Fragment>
                { !this.props.puser ? <PageTitle><List /> Following</PageTitle> : null }
                {horizontalNavigation}
                <Route path={spacePath} render={() => spaces} />
                <Route path={usersPath} render={() => following} />
                {
                    this.props.puser ?
                    <Redirect from={`/user/${user._id}/following`} to={`/user/${user._id}/following/spaces`} />
                    : null
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user : state.auth.user ,
        token : state.auth.token ,
        spaces : state.spaces.spaces ,
        spaceResults : state.spaces.results ,
        users : state.users.users ,
        usersResults : state.users.results ,
        loading : state.spaces.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadSpaces : (token , filter) => dispatch(actions.loadSpaces(token , filter)),
        onLoadUsers : (token , filter) => dispatch(actions.loadUsers(token , filter))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Following);