import React , { Component , Fragment } from 'react';
import axiosInstance from '../../axiosInstance';
import QuestionGrid from '../../components/Question/QuestionGrid/question-grid';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import PageTitle from '../../components/UI/PageTitle/page-title';
import { Create } from '@material-ui/icons';
import {Button} from '@material-ui/core';
import Loader from '../../components/UI/Loader/loader';

class Answer extends Component{

    componentDidMount = () => {
        if( !this.props.loading ){
            this.props.onLoadQuestions(
                this.props.token
            )
        }
    }

    loadQuestionsHandler = () => {
        this.props.onLoadQuestions(
            this.props.token
        )
    }

    componentDidUpdate = () => {
        window.scrollTo( 0 , document.body.scrollHeight - 2500 )
    }

    render(){

        if( this.props.loading ){
            return <Loader />
        }

        let loadMoreButton = null;
        if( this.props.questions && this.props.questions.length < this.props.results ){
            loadMoreButton = <div style={{ margin : '2rem 0' }} >
                                <Button variant="contained" color="primary" onClick={this.loadQuestionsHandler}>
                                    Load More
                                </Button>
                            </div>
        } 
        return(
            <Fragment>
                <PageTitle><Create /> Answer</PageTitle>
                <QuestionGrid
                questions={this.props.questions}
                showAllAnswer
                showAnswerCard
                />
                {loadMoreButton}
            </Fragment>  
        )
    }
}

const mapStateToProps = state => {
    return{
        loading : state.questions.loading ,
        questions : state.questions.questions ,
        token : state.auth.token ,
        results : state.questions.results
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoadQuestions : (token) => dispatch(actions.loadQuestions(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Answer,axiosInstance));