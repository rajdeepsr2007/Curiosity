import React , { Component } from 'react';
import PageTitle from '../../../components/UI/PageTitle/page-title';
import axiosInstance from '../../../axiosInstance';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';
import { Fragment } from 'react';
import { ExploreOutlined } from '@material-ui/icons';
import SpaceGrid from '../../../components/Space/Space Grid/space-grid';
import {Button} from '@material-ui/core';

class DiscoverSpaces extends Component{

    componentDidMount = () => {
        this.props.onLoadSpaces(this.props.token);
    }

    loadSpacesHandler = () => {
        this.props.onLoadSpaces(this.props.token);
        setTimeout( () => {
            window.scrollTo(0 , document.body.scrollHeight - 1500);
        } , 2000)
    }

    render(){

        let loadMoreButton = this.props.spaces.length < this.props.results ? (
            <div style={{ margin : '2rem 0' }} >
                <Button variant="contained" color="primary" onClick={this.loadSpacesHandler}>
                    Load More
                </Button>
            </div>   
        ) : null

        if( !this.props.spaces ){
            loadMoreButton = null;
        }

        return (
            <Fragment>
                <PageTitle><ExploreOutlined />Discover Spaces</PageTitle>
                <SpaceGrid spaces={this.props.spaces} />
                {loadMoreButton}
            </Fragment>
        )
       
    }
}

const mapStateToProps = state => {
    return {
        spaces : state.spaces.spaces,
        token : state.auth.token,
        results : state.spaces.results
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoadSpaces : (token) => dispatch(actions.loadSpaces(token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(DiscoverSpaces,axiosInstance));