import React , { Component } from 'react';
import Loader from '../../../components/UI/Loader/loader';
import {connect} from 'react-redux';
import QuestionCard from '../../../components/Question/QuestionGrid/QuestionCard/question-card';

class QuestionComplete extends Component{

    state = {
        question : null
    }

    componentDidUpdate = () => {
        
    }

    componentDidMount = () => {
        if( this.state.question === null ){
            const questionId = this.props.match.params.id;
            const question = this.props.questions.find( question => {
                return question._id === questionId
            } )
            this.setState({ question : question });
        }
    }

    render(){

        if( !this.state.question ){
            return <Loader />
        }

        return(
           <QuestionCard 
           question={this.state.question} 
           showAnswerButton
           />
        )
    }
}

const mapStateToProps = state => {
    return {
        questions : state.questions.questions
    }
}

export default connect(mapStateToProps)(QuestionComplete);