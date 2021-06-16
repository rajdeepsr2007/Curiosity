import React , {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import axiosInstance from '../../axiosInstance';
import Alert from '../../components/UI/Feedback/Alert/alert';
import Loader from '../../components/UI/Loader/loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import UserBox from '../../components/User/User Box/user-box';
import HorizontalButtonGroup from '../../components/Inputs/Horizontal Button Group/horizontal-button-group';

class UserProfile extends Component{
    state={
        user : null
    }

    componentDidUpdate = () => {
        if( (!this.state.user && !this.state.error && this.props.user) || (this.props.user && this.state.user && this.state.user.follow !== this.props.user.follow)  ){
            this.setState({ user : this.props.user })
        }
    }

    componentDidMount = () => {
        const userId = this.props.match.params.id;
        this.props.onLoadUser(this.props.token , userId);
    }

    render(){

        const userId = this.props.match.params.id;
        if( this.props.error ){
            return <Alert alertType="error" size="big" text={this.props.error} />
        }
        if( (this.props.loading && this.props.loading.userId === userId && !this.props.loading.type) || !this.state.user ){
            return <Loader />
        }
        const user = this.state.user;
        const buttons = [
            { to : `/user/${user._id}/followers` , title : `Followers (${user.followers.length})` },
            { to : `/user/${user._id}/following` , title : `Following` },
            { to : `/user/${user._id}/questions` , title : `Questions (${user.questions.length})` },
            { to : `/user/${user._id}/answers` , title : `Answers (${user.answers.length})` },
        ]
        return(
            <Fragment>
                <UserBox 
                user={user} 
                onFollowUser={() => this.props.onFollowUser(this.props.token , this.state.user._id)}
                following={this.props.loading && this.props.loading.type && this.props.loading.userId === this.state.user._id }
                />
                <HorizontalButtonGroup
                buttons={buttons}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        user : state.users.user,
        error : state.users.error ,
        loading : state.users.loading,
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoadUser : (token, userId) => dispatch(actions.loadUser(token ,userId)),
        onFollowUser : (token , userId) => dispatch(actions.followUser(token , userId))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(UserProfile,axiosInstance));