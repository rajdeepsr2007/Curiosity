import React , {Component , Fragment} from 'react';
import QuestionGrid from '../../../../components/Question/QuestionGrid/question-grid';
import Loader from '../../../../components/UI/Loader/loader';
import {Button} from '@material-ui/core';
import * as actions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import Alert from '../../../../components/UI/Feedback/Alert/alert';

class SimilarQuestions extends Component{
    state = {
        filter : {
            similar : [this.props.questionId]
        }
    }
    componentDidMount = () => {
        this.props.onLoadQuestions(
            this.props.token,
            this.state.filter
        )
    }
    componentDidUpdate = () => {
        window.scrollTo(0 , document.body.scrollHeight - 2500);
    }
    loadQuestionsHandler = () => {
        this.props.onLoadQuestions(
            this.props.token,
            this.state.filter
        )
    }
    render(){

        if(this.props.loading){
            return <Loader />
        }
        if( this.props.error ){
            return <Alert alertType="error" size="big" text={this.props.error} />
        }

        return(
            <Fragment>
                <QuestionGrid questions={this.props.questions} />
                {   this.props.showing < this.props.results ?
                    <Button variant="contained" color="primary" onClick={this.loadQuestionsHandler}>
                        Load More{`(${this.props.results - this.props.showing > 4 ? 5 : this.props.results - this.props.showing })`}
                    </Button>
                    : null
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token ,
        questions : state.questions.questions,
        loading : state.questions.loading ,
        error : state.questions.error ,
        showing : state.questions.showing ,
        results : state.questions.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadQuestions : (token , filter ) => dispatch(actions.loadQuestions(token , filter , false))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(SimilarQuestions);

