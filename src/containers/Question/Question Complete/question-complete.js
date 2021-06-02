import React , { Component , Fragment} from 'react';
import Loader from '../../../components/UI/Loader/loader';
import {connect} from 'react-redux';
import QuestionCard from '../../../components/Question/QuestionGrid/QuestionCard/question-card';
import HorizontalButtonGroup from '../../../components/Inputs/Horizontal Button Group/horizontal-button-group';
import * as actions from '../../../store/actions/';
import axiosInstance from '../../../axiosInstance';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './question-complete.module.css'
import AnswerGrid from '../../../components/Answer/AnswerGrid/answer-grid';
import { Route } from 'react-router';
import { Button } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import Alert from '../../../components/UI/Feedback/Alert/alert';

class QuestionComplete extends Component{

    state = {
        question : null
    }

    componentDidUpdate = () => {
        if( !this.props.error && !this.props.loading && this.state.question && ( !this.props.answers || JSON.stringify(this.props.questionId) !== JSON.stringify(this.state.question._id)  ) ){
            this.props.onLoadAnswers(this.props.token , this.state.question._id);
        }
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

    onRefreshHandler = () => {
        this.props.onLoadAnswers(this.props.token , this.state.question._id);
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

        let answers = null;

        if(this.props.loading && !this.props.error){
            answers = <Loader />
        }

        const refreshButton = (
            <div className={classes.button} >
                <Button variant="outlined" color="primary" onClick={this.onRefreshHandler}>
                    <Replay /> Refresh
                </Button>
            </div>   
        )

        if( this.props.answers ){
            answers = <div className={classes.answers} >
                        <AnswerGrid
                        answers={this.props.answers}
                        />
                      </div>
            
        }

        return(
            <Fragment>
                <QuestionCard 
                question={this.state.question} 
                showAnswerButton
                />
                <div className={classes.options} >
                    {buttons}
                </div>
                <div className={classes.answers}>
                    {this.props.error ? <Alert alertType="error" text={this.props.error} /> : null }
                    {refreshButton}
                    <Route path={`/question/${this.state.question._id}/answers`} render={() => answers}  />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading : state.answers.loading,
        questions : state.questions.questions,
        answers : state.answers.answers,
        questionId : state.answers.questionId,
        token : state.auth.token,
        error : state.answers.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadAnswers : (token , questionId) => dispatch(actions.loadAnswers(token,questionId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(QuestionComplete,axiosInstance));