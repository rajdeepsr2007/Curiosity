import React , { Component, Fragment } from 'react';
import Loader from '../../components/UI/Loader/loader';
import axiosInstance from '../../axiosInstance';
import Topic from '../../components/Topics/Topic/topic';
import classes from './topics.module.css'
import { Button } from '@material-ui/core';

class Topics extends Component{

    state = {
        topics : null
    }

    selectTopicHandler = (id) => {
        this.setState( (prevState , props) => {
            const updatedTopics = [];
            for( const topic of prevState.topics){
                updatedTopics.push({...topic})
            }
            for( let i= 0; i<updatedTopics.length ; i++ ){
                if( updatedTopics[i].id === id ){
                    updatedTopics[i].selected = !updatedTopics[i].selected
                }
            }
            return {
                ...prevState ,
                topics : updatedTopics
            }
        } )
    }

    componentDidMount = () => {
        if( !this.state.interests ){
            axiosInstance.get('/api/auth/topics')
            .then( response => {
                const topics = [];
                for(let i=0 ;i < response.data.topics.length; i++){
                    topics.push({ id : i , selected : false , description : response.data.topics[i] })
                }
                this.setState({ topics : topics })
            })
        }
    }

    render(){

        let content = <Loader />
        if( this.state.topics ){
            content = this.state.topics.map( topic => {
                return (
                   <Topic 
                   key={topic.id} 
                   topic={topic} 
                   onClick={() => this.selectTopicHandler(topic.id)}/>
                )
            } )
        }

        const listClasses = [classes.list];
        if( this.state.topics ){
            listClasses.push(classes.loaded)
        }else{
            listClasses.push(classes.loading)
        }

        const submitButton = <div className={classes.button} >
                                <Button variant="outlined" color="primary">
                                    Save Changes
                                </Button>
                            </div>

        return (
            <div className={classes.topics} >
                 <h2>Select Atleast 3 Topics</h2>
                 <div className={listClasses.join(' ')}>
                     {content}
                 </div>
                 {submitButton}
            </div>
        )
    }
}

export default Topics;