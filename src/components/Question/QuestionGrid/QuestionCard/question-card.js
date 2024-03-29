import React , {Component, Fragment} from 'react';
import Badges from '../../../Inputs/Badges/badges';
import ReadOnlyEditor from '../../../Inputs/Read Only Editor/read-only-editor';
import baseURL from '../../../../baseURL';
import classes from './question-card.module.css';
import { Button } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {formatDate} from '../../../util/util';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import AnswerGrid from '../../../Answer/AnswerGrid/answer-grid';
import DeleteButton from '../../../Inputs/Delete Button/delete-button';
import Loader from '../../../UI/Loader/loader';

class QuestionCard extends Component{

    componentDidMount = () => {
        if( !this.props.answers[this.props.question._id] && !this.props.loading ){
            this.props.onLoadAnswers(
                this.props.token ,
                this.props.question._id
            )
        }
    }

    componentDidUpdate = () => {
        if( !this.props.answers[this.props.question._id] && !this.props.loading ){
            this.props.onLoadAnswers(
                this.props.token ,
                this.props.question._id
            )
        }
    }

    render(){

        const {question} = this.props;
        let {picture} = question.user;
        picture = baseURL + picture;

        const badges = [question.topic.title , question.space.title , ...question.badges];

        let answerGrid = null;
        if( this.props.answers[question._id] && this.props.showAnswerCard ){
            if( this.props.answers[question._id].length ){
                answerGrid = <AnswerGrid
                              answers={[
                                  question.answer ? 
                                  question.answer
                                  : this.props.answers[question._id][0]
                                ]}
                              />
            }
        }

        let deleteQuestionButton=null;
        if( this.props.user ){
            deleteQuestionButton = this.props.user._id === question.user._id ?
                                     <DeleteButton 
                                     onClick={() => this.props.onDeleteQuestion(
                                         this.props.token ,
                                         question._id
                                     )} />
                                     : null
        }


        
        const questionCard = (
                <div className={classes.question} style={this.props.style} >
                <div className={classes.header} >
                    <div className={classes.user} >
                        <Link to={`/user/${question.user._id}/followers`} >
                            <img src={picture} alt={question.user.username} />
                            {question.user.username}  
                        </Link>   
                    </div>
                    <div className={classes.title}>
                        {question.title}
                        <span className={classes.date} >
                            {formatDate(question.createdAt)}
                        </span>
                    </div>
                </div>
                <ReadOnlyEditor rawContent={question.description} />
                <div className={classes.badges} >
                    <Badges 
                    badges={badges} 
                    showBadges
                    />
                </div>
                <div className={classes.options} >
                    {
                        this.props.showAllAnswer ? <Link to={`/question/${question._id}/answers`}>
                        <Button variant="outlined" color="primary" >
                            {`View all ${question.answers.length} Answers`}
                        </Button>
                    </Link> : null
                    }
                    {
                        this.props.showAnswerButton ? <Link to={`/answer/${question._id}`} >
                                                    <Button variant="outlined" color="primary" >
                                                        <Create /> Answer
                                                    </Button>
                                                </Link> : null
                    }
                    {deleteQuestionButton}
                </div>
                {answerGrid}
            </div>
        )

        return (
            <Fragment>
                {questionCard}
            </Fragment>
        )
    }  
}

const mapStateToProps = state => {
    return {
        token : state.auth.token ,
        answers : state.answers.answers ,
        loading : state.answers.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadAnswers : (token , questionId) => dispatch(actions.loadAnswers(token , questionId))
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(QuestionCard);