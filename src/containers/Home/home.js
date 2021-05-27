import React , { Component , Fragment } from 'react';
import {connect} from 'react-redux';
import axiosInstance from '../../axiosInstance';
import Loader from '../../components/UI/Loader/loader';
import * as actions from '../../store/actions/';
import PageTitle from '../../components/UI/PageTitle/page-title';
import QuestionGrid from '../../components/Question/QuestionGrid/question-grid';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Button } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import Alert from '../../components/UI/Feedback/Alert/alert';

class Home extends Component{

    componentDidMount = () => {
        this.props.onLoadQuestions(this.props.token);
    }

    onRefreshHandler = () => {
        this.props.onLoadQuestions(this.props.token);
    }

   render(){
       if( this.props.loading ){
           return <Loader />
       }

       const refreshButton = (
            <div style={{ margin : '2rem 0' }} >
                <Button variant="outlined" color="primary" onClick={this.onRefreshHandler}>
                    <Replay /> Refresh 
                </Button>
            </div>
       )

       return (
           <Fragment>
               <PageTitle>Home</PageTitle>
               {refreshButton}
               {this.props.error ? <Alert alertType="error" text={this.props.error} /> : null }
               {this.props.questions ? <QuestionGrid questions={this.props.questions} /> : null }
           </Fragment>
       )
   }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token,
        loading : state.questions.loading,
        questions : state.questions.questions,
        error : state.questions.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadQuestions : (token) => dispatch(actions.loadQuestions(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Home,axiosInstance));