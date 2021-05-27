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
import Badges from '../../../components/Inputs/Badges/badges';
import TextEditor from '../../../components/Inputs/Rich Text Editor/rich-text-editor';
import {Button} from '@material-ui/core';
import Alert from '../../../components/UI/Feedback/Alert/alert';

class AddQuestion extends Component{

    state = {
        loading : true ,
        error : null ,
        topicOptions : null ,
        spaceOptions : null ,
        topic : '-',
        space : '-',
        description : null,
        title : '',
        submitting : false,
        badges : [],
        showErrors : false
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        const { topic , title , space , description , badges } = this.state;
        if( topic === '-' || space === '-' || title === '' || description === null ){
            this.setState({error : 'Please fill all the fields' , showErrors : true })
        }else{
            this.setState({ submitting : true , error : null , showErrors : false })
            axiosInstance.post('/api/questions/add',{title, topic , space , description , badges},
            {
                headers : {
                    "Authorization" : "Bearer " + this.props.token
                }
            })
            .then( response => {
                this.setState({ submitting : false });
            } )
        }
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

    onBadgesChange = (badges) => {
        this.setState({ badges : [...badges] })
    }

    render(){

        if( this.state.loading && !this.state.error ){
            return <Loader />
        }

        let submitButton = <div style={{ margin : '2rem 0' }} >
                                    <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={this.submitFormHandler}
                                    >Submit</Button>
                                </div>
        if( this.state.submitting ){
            submitButton = <Loader />
        }

        return(
            <Fragment>
                <PageTitle><Add /> Add Question</PageTitle>
                <Dropdown label="Topic" value={this.state.topic} onChange={this.changeTopicHandler} options={this.state.topicOptions} />
                <Dropdown label="Space" value={this.state.space} onChange={this.changeSpaceHandler} options={this.state.spaceOptions} />
                <TitleInput label="Question Title" value={this.state.title} onChange={(event) => { this.setState({ title : event.target.value }) }} />
                <TextEditor onChange={ description => { this.setState({ description }) }} />
                <Badges onChange={this.onBadgesChange} />
                {this.state.error && this.state.showErrors ? <Alert alertType="error" text={this.state.error} /> : null} 
                {this.state.success ? <Alert alertType="success" text={this.state.success} /> : null }
                {submitButton}
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