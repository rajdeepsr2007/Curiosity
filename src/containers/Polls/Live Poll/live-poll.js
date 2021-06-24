import React , {Component} from 'react';
import socketIOClient from 'socket.io-client/dist/socket.io';
import PollCard from '../../../components/Polls/Poll Card/poll-card';
import Loader from '../../../components/UI/Loader/loader';

let socket;

class LivePoll extends Component{

    constructor(){
        super();
        this.state={
            connecting : true,
            endpoint : 'http://3.141.21.117:9000',
        }
        socket = socketIOClient(
            this.state.endpoint
        )
    }

    onVoteHandler = (optionId) => {
        console.log('voting');
        socket.emit('vote',{
            pollId : this.state.poll._id ,
            optionId ,
            userId : this.props.user._id
        })
    }

    componentDidMount = () => {
        this.setState({ poll : this.props.poll })
        socket.on('connected',() => {
            socket.emit('join-poll',{
                pollId : this.props.poll._id,
                userId : this.props.user._id
            })
            socket.on('poll-joined',() => {
                this.setState({ connecting : false })
            })
        });
        
        socket.on('vote-update', data => {
            console.log(data);
            this.setState( prevState => {
                const updatedPoll = prevState.poll;
                let voteChanges = 0;
                if( data.votes ){
                    for( const optionId in data.votes ){
                        updatedPoll['options'] = updatedPoll['options'].map( option => {
                            const votes = option._id === optionId ? 
                            option.votes + data.votes[optionId]
                            : option.votes;
                            return{
                                ...option ,
                                votes : votes
                            }
                        })
                        voteChanges += data.votes[optionId];
                    }
                    console.log(voteChanges);
                    updatedPoll.votes += voteChanges;
                }
                if( data.selected ){
                    updatedPoll.selected = data.selected;
                }
                return{
                    ...prevState ,
                    poll : updatedPoll
                }
            })
        })  
    }
    
    render(){

        if( this.state.connecting ){
            return <Loader />
        }

        return(
            <PollCard
            poll={this.state.poll}
            onVote={this.onVoteHandler}
            />
        )
    }
}

export default LivePoll;