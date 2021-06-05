import React , {Component} from 'react';
import SpaceCard from './SpaceCard/space-card';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import Alert from '../../UI/Feedback/Alert/alert';
import { Create } from '@material-ui/icons';
import Loader from '../../UI/Loader/loader';
import classes from './space-grid.module.css';

class SpaceGrid extends Component{
    state = {
        
    }

    followSpaceHandler = (spaceId) => {
        if( !this.props.loading ){
            this.props.onFollowSpace(
                this.props.token,
                spaceId
            )
        }
    }

    render(){

        if(this.props.loading && this.props.loading.type !== 'following' ){
            return <Loader />
        }

        if( !this.props.spaces ){
            return <div className={classes.spaces} >
                {
                    this.props.error ?
                    <Alert alertType="error" size="big" text={this.props.error} />
                    :<h3><Create /> No Spaces</h3>
                }
            </div>
        }

        const spaces = this.props.spaces.map(space => {
            return <SpaceCard
                   key={space._id}
                   space={space}
                   followSpaceHandler={this.followSpaceHandler}
                   followLoading={this.props.loading && this.props.loading.spaceId === space._id }
                   />
        })

        return (
            <div className={classes.spaces}>
                {spaces}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading : state.spaces.loading ,
        error : state.spaces.error,
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFollowSpace : (token , spaceId) => dispatch(actions.followSpace(token,spaceId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SpaceGrid);