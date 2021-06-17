import React , {Component, Fragment} from 'react';
import Alert from '../../../UI/Feedback/Alert/alert';
import Loader from '../../../UI/Loader/loader';
import QuestionGrid from '../../../Question/QuestionGrid/question-grid';
import { Button } from '@material-ui/core';
import {connect} from 'react-redux';

class UserQuestions extends Component{
   state={
       filter : this.props.answers ? 
                {
                    withAnswer : [this.props.user._id]
                } 
                : {
                    by:[this.props.user._id]
                }
   }

   loadQuestionsHandler = () => {
       if( !this.props.loading && !this.props.error ){
            this.props.onLoadQuestions(
                this.props.token ,
                this.state.filter
            )
       }
   }

   componentDidUpdate = (prevProps) => {
       if( (prevProps.answers && !this.props.answers) || (!prevProps.answers && this.props.answers) ){
            const filter =  this.props.answers ? 
            {
                withAnswer : [this.props.user._id]
            } 
            : {
                by:[this.props.user._id]
            }
            this.props.onLoadQuestions(
                this.props.token ,
                filter
            )
       }
   }

   componentDidMount = () => {
       this.props.onLoadQuestions(
           this.props.token ,
           this.state.filter
       )
   }

   render(){

        if(this.props.loading){
            return <Loader />
        }

        if(this.props.error){
            return <Alert alertType="error" size="big" text={this.props.error} />
        }

        let loadMoreButton = this.props.questions.length < this.props.results ? <div style={{ margin : '2rem 0' }} >
            <Button variant="contained" color="primary" onClick={this.loadQuestionsHandler} >
                Load More
            </Button>
        </div> : null


        return(
            <Fragment>
                <QuestionGrid 
                questions={this.props.questions} 
                withAnswer={this.props.answer}
                />
                {loadMoreButton}
            </Fragment>
        )
   }
}

const mapStateToProps = state => {
    return{
        loading : state.questions.loading ,
        error : state.questions.error ,
        questions : state.questions.questions,
        token : state.auth.token,
        results : state.questions.results
    }
}

export default connect(mapStateToProps)(UserQuestions);