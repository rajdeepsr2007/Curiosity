import React , { Component, Fragment } from 'react';
import Loader from '../../components/UI/Loader/loader';
import axiosInstance from '../../axiosInstance';
import Topic from '../../components/Topics/Topic/topic';
import classes from './topics.module.css'
import { Button } from '@material-ui/core';

import {connect} from 'react-redux';
import Alert from '../../components/UI/Feedback/Alert/alert';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Topics extends Component{

    state = {
        topics : null,
        loading : true,
        error : null,
        submitting : false,
        success : null
    }

    saveChangesHandler = () => {
        this.setState({ submitting : true })
        let selectedTopics = this.state.topics.map( topic => {
            return topic.selected ? 1 : 0
        } )
        .reduce( (sum , el) => {
           return sum += el
        } , 0 )

        if( selectedTopics < 3 ){
            this.setState({ error : 'Please select atleast 3 topics' , submitting : false })
        }else{
            axiosInstance.post('/api/user/edit-topics' , { topics : this.state.topics },{
                headers : {
                    "Authorization" : "Bearer " + this.props.token
                }
            })
            .then( response => {
                if( response ){
                    this.setState({ submitting : false , success : response.data.message })
                }
            } )
        }

    }

    selectTopicHandler = (id) => {
        this.setState( (prevState , props) => {
            const updatedTopics = [];
            for( const topic of prevState.topics){
                updatedTopics.push({...topic})
            }
            for( let i= 0; i<updatedTopics.length ; i++ ){
                if( updatedTopics[i]._id === id ){
                    updatedTopics[i].selected = !updatedTopics[i].selected
                }
            }
            return {
                ...prevState ,
                topics : updatedTopics,
                error : null
            }
        } )
    }

    componentDidMount = () => {
        if( !this.state.topics ){
            this.setState({ loading : true , error : null })
            axiosInstance.get('/api/user/topics',{
                headers : {
                    "Authorization" : "Bearer " + this.props.token
                }
            })
            .then( response => {
              if(response){
                  for( let i = 0 ; i < response.data.topics.length ; i++ ){
                      response.data.topics[i] = {...response.data.topics[i] , selected : false}
                  }
                  this.setState({ topics : response.data.topics , loading : false })
              }else{
                  this.setState({ loading : false , error : 'Network Error' })
              }
            })
        }
    }

    render(){

        let content = <Loader />
        if( this.state.topics ){
            content = this.state.topics.map( topic => {
                return (
                   <Topic 
                   key={topic._id} 
                   topic={topic} 
                   onClick={() => this.selectTopicHandler(topic._id)}/>
                )
            } )
        }

        const listClasses = [classes.list];
        if( this.state.topics ){
            listClasses.push(classes.loaded)
        }else{
            listClasses.push(classes.loading)
        }

        let submitButton = <div className={classes.button} >
                                <Button variant="contained" color="primary" onClick={this.saveChangesHandler} >
                                    Save Changes
                                </Button>
                            </div>

        if( this.state.submitting ){
            submitButton = <Loader />
        }

        return (
            <div className={classes.topics} >        
                 <h2>Select Topics That Interest You</h2>
                 {submitButton}
                 {this.state.error ? <Alert alertType="error" size="small" text={this.state.error}/> : null}
                 {this.state.success ? <Alert alertType="success" size="small" text={this.state.success} /> : null }
                 <div className={listClasses.join(' ')}>
                     {content}
                 </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

export default connect(mapStateToProps)(withErrorHandler(Topics,axiosInstance));