import { Button } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import React , { Component } from 'react';
import { Fragment } from 'react';
import {connect} from 'react-redux';
import axiosInstance from '../../../axiosInstance';
import TextEditor from '../../../components/Inputs/Rich Text Editor/rich-text-editor';
import QuestionCard from '../../../components/Question/QuestionGrid/QuestionCard/question-card';
import Alert from '../../../components/UI/Feedback/Alert/alert';
import Loader from '../../../components/UI/Loader/loader';
import PageTitle from '../../../components/UI/PageTitle/page-title';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './answer.module.css';

class AnswerQuestion extends Component{

    state = {
        question : null,
        answerDescription : null,
        error : null,
        showErrors : false,
        submitting : false
    }

    submitAnswerHandler = (event) => {
        event.preventDefault();
        if( this.state.answerDescription === null ){
            this.setState({ error : 'Please fill answer description' , showErrors : true });
        }else{
            this.setState({ submitting : true , error : null , showErrors : false , success : null })
            axiosInstance.post('/answer/add',{ questionId : this.state.question._id , description : this.state.answerDescription },
                {
                    headers : {
                        "Authorization" : "Bearer " + this.props.token
                    }
                }
            )
            .then( response => {
                if( response ){
                    this.setState({ submitting : false , success : 'The answer was submitted' })
                }else{
                    this.setState({ submitting : false , error : 'Network Error' , showErrors : true })
                }
            } )
            .catch( error => {
                this.setState({ submitting : false , error : error.message , showErrors : true })
            } )
        }
    }

    onChange = (answerDescription) => {
        this.setState({ answerDescription , showErrors : false })
    }

    componentDidMount = () => {
        if( !this.state.question ){
            const questionId = this.props.match.params.id;
            const question = this.props.questions.find( question => {
                return question._id === questionId
            } )
            this.setState({ question : question })
        }
    }

    render(){

        let content = <Loader />
        if( this.state.question ){
            content = <div className={classes.answer} >
                        <QuestionCard 
                        question={this.state.question}
                        />
                        <TextEditor 
                        placeholder='Answer Description...'
                        onChange={this.onChange}
                        />
                      </div>
        }
        let submitButton = <Loader />
        if( this.state.question && !this.state.submitting ){
            submitButton =  <div className={classes.button} >
                                <Button 
                                variant="contained"
                                color="primary"
                                onClick={this.submitAnswerHandler}
                                >
                                Submit
                                </Button>
                            </div>
        }

        return(
            <Fragment>
                 <PageTitle><Create /> Answer</PageTitle>
                 {content}
                 { this.state.error && this.state.showErrors ? <Alert alertType="error" text={this.state.error} /> : null }
                 { this.state.success ? <Alert alertType="success" text={this.state.success} /> : null }
                 {submitButton}
            </Fragment>
           
        )
    }
}

const mapStateToProps = state => {
    return {
        questions : state.questions.questions,
        token : state.auth.token
    }
}

export default connect(mapStateToProps)(withErrorHandler(AnswerQuestion,axiosInstance));