import React , { Component } from 'react';
import PageTitle from '../../../components/UI/PageTitle/page-title';
import axiosInstance from '../../../axiosInstance';
import Loader from '../../../components/UI/Loader/loader';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';
import { Fragment } from 'react';
import SpaceCard from '../../../components/Space/SpaceCard/space-card';
import Alert from '../../../components/UI/Feedback/Alert/alert';
import { ExploreOutlined } from '@material-ui/icons';

class DiscoverSpaces extends Component{

    state = {
        sortOptions : [
            { value : 'popularity' , title : 'Popularity' },
            { value : 'questions', title : 'Questions' }
        ],
        sortOption : '-'
    }
    
    changeSortHandler = (event) => {
        //this.setState({ sortOption :  })
    }

    componentDidMount = () => {
        this.props.onLoadSpaces(this.props.token);
    }

    onFollowHandler = (spaceId) => {
        this.props.onFollowSpace(this.props.token,spaceId)
    }

    render(){

        if(this.props.loading){
            return <Loader />
        }

        let spaces = null;
        if(this.props.spaces){
            spaces = this.props.spaces.map( space => {
                return <SpaceCard  
                        key={space._id} 
                        space={space} 
                        onFollow = {() => this.onFollowHandler(space._id)}
                        />
            } )
        }

        return (
            <Fragment>
                <PageTitle><ExploreOutlined />Discover Spaces</PageTitle>
                {this.props.error ? <Alert alertType="error" text={this.props.error} /> : null }
                {spaces}
            </Fragment>
        )
       
    }
}

const mapStateToProps = state => {
    return {
        loading : state.spaces.loading ,
        error : state.spaces.error,
        spaces : state.spaces.spaces,
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoadSpaces : (token) => dispatch(actions.loadSpaces(token)),
        onFollowSpace : (token,spaceId) => dispatch(actions.followSpace(token,spaceId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(DiscoverSpaces,axiosInstance));