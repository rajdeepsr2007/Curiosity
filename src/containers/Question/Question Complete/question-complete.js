import React , { Component , Fragment} from 'react';
import Loader from '../../../components/UI/Loader/loader';
import {connect} from 'react-redux';
import QuestionCard from '../../../components/Question/QuestionGrid/QuestionCard/question-card';
import HorizontalButtonGroup from '../../../components/Inputs/Horizontal Button Group/horizontal-button-group';
import classes from './question-complete.module.css'

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

        const navigationButtons = [
            { 
                to : `/question/${this.state.question._id}/answers` , 
                title : `(${this.state.question.answers.length}) Answers`
            },
            { 
                to : `/question/${this.state.question._id}/similar` , 
                title : `Similar Questions`
            }
        ]

        const buttons = (
            <HorizontalButtonGroup buttons={navigationButtons} />
        )

        return(
            <Fragment>
                <QuestionCard 
                question={this.state.question} 
                showAnswerButton
                />
                <div className={classes.answers} >
                    {buttons}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        questions : state.questions.questions
    }
}

export default connect(mapStateToProps)(QuestionComplete);