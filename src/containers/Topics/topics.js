import React , { Component, Fragment } from 'react';
import classes from './topics.module.css'

class Topics extends Component{

    state = {
        topics : null
    }

    componentDidMount = () => {
        if( !this.state.interests ){
            axiosInstance.get('/api/auth/topics')
            const topics = []
            .then( response => {
                const topics = [];
                for(let i=0 ;i <= response.data.topics.length; i++){
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
                    <Topic topic={topic} onClick={selectTopicHandler} />
                )
            } )
        }

        return (
            <div className={classes.topics} >
                 <h1>Select Atleast 3 Topics</h1>
                 {content}
            </div>
        )
    }
}

export default Topics;