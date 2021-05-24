import React , { Component } from 'react';
import { Fragment } from 'react';
import TitleInput from '../../../components/Inputs/TitleInput/title-input';
import Dropdown from '../../../components/Inputs/Dropdown/dropdown';
import PageTitle from '../../../components/UI/PageTitle/page-title';
import { Add } from '@material-ui/icons';
import Loader from '../../../components/UI/Loader/loader';
import axiosInstance from '../../../axiosInstance';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class AddQuestion extends Component{

    state = {
        loading : true ,
        error : null ,
        topicOptions : null ,
        spaceOptions : null ,
        topic : '-',
        space : '-'
    }

    changeSpaceHandler = (event) => {
        this.setState({ space : event.target.value })
    }

    changeTopicHandler = (event) => {
        this.setState({ loading : true })
        axiosInstance.post('/api/spaces/by-topic',{ topic : event.target.value })
        .then( response => {
            if( response ){
                const options = response.data.spaces.map( space => {
                    return {
                        value : space._id ,
                        title : space.title
                    }
                } )
                this.setState({ loading : false , spaceOptions : options })
            }else{
                this.setState({ loading : false , error : 'Network Error' })
            }
        } )
        .catch(error => {
            this.setState({ laoding : false , error : error.message })
        })
        this.setState({ topic : event.target.value , space : '-' })
    }

    componentDidMount = () => {
        if( !this.state.topicOptions ){
            axiosInstance.get('/api/user/topics',{
                headers : {
                    "Authorization" : "Bearer " + this.props.token
                }
            })
            .then( response => {
                if( response ){
                    const options = response.data.topics.map( topic => {
                        return {
                            value : topic._id ,
                            title : topic.title
                        }
                    } )
                    this.setState({ loading : false , topicOptions : options })
                }else{
                    this.setState({ loading : false , error : 'Network Error' })
                }
            } )
            .catch(error => {
                this.setState({ laoding : false , error : error.message })
            })
        }
    }

    render(){

        if( this.state.loading && !this.state.error ){
            return <Loader />
        }

        return(
            <Fragment>
                <PageTitle><Add /> Add Question</PageTitle>
                <TitleInput label="Question Title" value='' onChange={() => {}} />
                <Dropdown label="Topic" value={this.state.topic} onChange={this.changeTopicHandler} options={this.state.topicOptions} />
                <Dropdown label="Space" value={this.state.space} onChange={this.changeSpaceHandler} options={this.state.spaceOptions} />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

export default connect(mapStateToProps)(withErrorHandler(AddQuestion,axiosInstance));