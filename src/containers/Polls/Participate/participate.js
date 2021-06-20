import React , {Component, Fragment} from 'react';
import { TextField , Button } from '@material-ui/core';
import axiosInstance from '../../../axiosInstance';
import Alert from '../../../components/UI/Feedback/Alert/alert';
import PollCard from '../../../components/Polls/Poll Card/poll-card';

class PollParticipate extends Component{
    state={
        poll : null,
        loading : false,
        pollId : null
    }

    onSubmitHandler = () => {
        if( !this.state.pollId ){
            return
        }else{
            this.setState({ loading : true , error : null })
            axiosInstance.get("/api/polls/get-poll/" + this.state.pollId)
            .then(response => {
                this.setState({ loading : false })
                if( response ){
                    if( response.data.success ){
                        this.setState({ poll : response.data.poll })
                    }else{
                        this.setState({ error : response.data.message })
                    }
                }else{
                    this.setState({ error : 'Network Error' })
                }
            })
            .catch(error=>{
                this.setState({ error : 'Network Error' })
            })
        }
    }

    render(){

        const submitButton = (
            <div style={{ margin : '2rem 0' }} >
                <Button 
                variant='contained' 
                color='primary' 
                disabled={this.state.loading} 
                onClick={ this.onSubmitHandler }>
                    Submit
                </Button>
            </div>
        )

        const pollCard = this.state.poll ?  (
            <PollCard
            poll={this.state.poll}
            />
        ) : null

        return(
            <Fragment>
                <TextField 
                type='text'
                value={this.state.value}
                label='Poll Id'
                style={{ margin : '2rem 0'}}
                onChange={(event) => this.setState({ pollId : event.target.value , error : null })}
                /> 
                { this.state.error ? <Alert alertType="error" text={this.state.error} /> : null }
                {submitButton}
                {pollCard}        
            </Fragment>
            
        )
    }
}

export default PollParticipate;