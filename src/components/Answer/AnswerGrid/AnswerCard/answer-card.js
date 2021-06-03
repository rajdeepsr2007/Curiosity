import React from 'react';
import ReadOnlyEditor from '../../../Inputs/Read Only Editor/read-only-editor';
import baseURL from '../../../../baseURL';
import classes from './answer-card.module.css';
import { Button } from '@material-ui/core';
import { ThumbDown, ThumbUp } from '@material-ui/icons';
import * as actions from '../../../../store/actions/index'
import {connect} from 'react-redux';
import CommentGrid from '../../../Comment/Comment Grid/comment-grid';
import {formatDate} from '../../../util/util';

const AnswerCard = (props) => {

    const {answer} = props;

    let {picture} = answer.user;
    picture = baseURL + picture;

    return(
        <div className={classes.answer} >
            <div className={classes.header} >
                <div className={classes.user} >
                    <img src={picture} alt={answer.user.username}/>
                    {answer.user.username}
                </div>
                <div className={classes.title}>
                    <span className={classes.date} >
                        {formatDate(answer.createdAt)}
                    </span>
                </div>
            </div>
            <ReadOnlyEditor rawContent={answer.description} />
            <div className={classes.options} >
                <span className={answer.upvoted ? classes.button : null}>
                    <Button onClick={() => props.onVoteAnswer(props.token , answer._id , 'upvote' , answer.question )} >
                        <ThumbUp /> 
                        <span className={classes.label}>{answer.upvotes}</span>
                    </Button>
                </span>
                <span className={answer.downvoted ? classes.button : null}>
                    <Button onClick={() => props.onVoteAnswer(props.token , answer._id , 'downvote' , answer.question )}>
                        <ThumbDown />
                        <span className={classes.label}>{answer.downvotes}</span>
                    </Button>
                </span>
            </div>
            <CommentGrid answer={answer} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onVoteAnswer : (token , answerId , type , questionId ) => dispatch( actions.voteAnswer(token , answerId , type , questionId ) )
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(AnswerCard);