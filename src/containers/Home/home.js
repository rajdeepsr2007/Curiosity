import React , { Component , Fragment } from 'react';
import {connect} from 'react-redux';
import axiosInstance from '../../axiosInstance';
import Loader from '../../components/UI/Loader/loader';
import * as actions from '../../store/actions/';
import PageTitle from '../../components/UI/PageTitle/page-title';
import QuestionGrid from '../../components/Question/QuestionGrid/question-grid';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Home extends Component{

    componentDidMount = () => {
        this.props.onLoadQuestions(this.props.token);
    }

   render(){
       if( this.props.loading ){
           return <Loader />
       }

       console.log(this.props.questions)

       return (
           <Fragment>
               <PageTitle>Home</PageTitle>
               <QuestionGrid questions={this.props.questions} />
           </Fragment>
       )
   }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token,
        loading : state.questions.loading,
        questions : state.questions.questions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadQuestions : (token) => dispatch(actions.loadQuestions(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Home,axiosInstance));