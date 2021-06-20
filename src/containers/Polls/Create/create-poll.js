import React , {Component} from 'react';
import { Fragment } from 'react';
import TextEditor from '../../../components/Inputs/Rich Text Editor/rich-text-editor';
import { TextField , Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PollCard from '../../../components/Polls/Poll Card/poll-card';
import {connect} from 'react-redux';
import axiosInstance from '../../../axiosInstance';
import Alert from '../../../components/UI/Feedback/Alert/alert';
import Loader from '../../../components/UI/Loader/loader';

class CreatePoll extends Component{
    state={
        description : null,
        options : [],
        value : ''
    }

    onAddOption = () => {
        if( this.state.value.trim() === '' ){
            return
        }
        this.setState( prevState => {
            const updatedOptions = [];
            for( const option of prevState.options ){
                updatedOptions.push({ ...option })
            }
            updatedOptions.push({
                title : prevState.value ,
                _id : Math.ceil(Math.random() * 10000)
            })
            return {
                ...prevState,
                options : updatedOptions
            }
        } )
    }

    onAddPoll = () => {
        if( this.state.options.length < 2 ){
            return
        }
        this.setState({ submitting : true , error : null , success : null });
        axiosInstance.post('/api/polls/add',{ poll : { options : this.state.options , description : this.state.description } },{
            headers : {
                "Authorization" : "Bearer " + this.props.token
            }
        })
        .then( response => {
            if( response ){
                this.setState({ 
                    submitting : false , 
                    success : `Poll Id : ${response.data._id}` 
                })
            }else{
                this.setState({ submitting : false , error : 'Network Error' })
            }
        } )
        .catch(error => {
            this.setState({ submitting : false , error : 'Network Error' })
        })
    }

    onChangeOptionTitle = (event) => {
        this.setState({ value : event.target.value })
    }

    onDescriptionChange = (description) => {
        this.setState({ description })
    }

    onRemoveOption = (_id) => {
        this.setState(prevState => {
            const updatedOptions = prevState.options.filter( option => option._id !== _id )
            return{
                ...prevState,
                options : updatedOptions
            }
        })
    }

    render(){

        const buttonStyle={ margin : '2rem 0' }

        const addOptionButton = (
            <div style={buttonStyle} >
                <Button variant='outlined' color='primary' onClick={this.onAddOption} >
                    <Add /> Add Option
                </Button>
            </div>
        )

        const addPollButton = this.state.submitting ? <Loader /> : (
            <div style={buttonStyle}>
                <Button variant='contained' color='primary' onClick={this.onAddPoll} >
                    Create Poll
                </Button>
            </div>
        )

        return(
            <Fragment>
                <TextEditor
                onChange={this.onDescriptionChange}
                placeholder='Poll Description'
                />
                <PollCard
                poll={{ 
                    options : this.state.options , 
                    description : this.state.description , 
                    createdAt : new Date(),
                    user : this.props.user
                }}
                onRemoveOption={this.onRemoveOption}
                />
                <TextField
                type={'text'}
                value={this.state.value}
                label={'Option Title'}
                variant={'outlined'}
                style={{ width : '50%' , marginBottom : '2rem' }}
                onChange={(event) => this.onChangeOptionTitle(event)}
                />
                {addOptionButton}
                { this.state.error ? <Alert alertType="error" text={this.state.error} /> : null }
                { this.state.success ? <Alert alertType="success" size="big" text={this.state.success} /> : null }
                {addPollButton}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        user : state.auth.user,
        token : state.auth.token
    }
}

export default connect(mapStateToProps)(CreatePoll);