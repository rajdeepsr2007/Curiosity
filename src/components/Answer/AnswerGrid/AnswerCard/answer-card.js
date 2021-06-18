import React from 'react';
import ReadOnlyEditor from '../../../Inputs/Read Only Editor/read-only-editor';
import baseURL from '../../../../baseURL';
import classes from './answer-card.module.css';
import { Button } from '@material-ui/core';
import { Image, ThumbDown, ThumbUp } from '@material-ui/icons';
import * as actions from '../../../../store/actions/index'
import {connect} from 'react-redux';
import CommentGrid from '../../../Comment/Comment Grid/comment-grid';
import {formatDate} from '../../../util/util';
import { Link } from 'react-router-dom';
import DeleteButton from '../../../Inputs/Delete Button/delete-button';


const AnswerCard = (props) => {

    const {answer} = props;

    let {picture} = answer.user;
    picture = baseURL + picture;

    let showAnswerImagesButton = null;

    if( answer.images && answer.images.length > 0  ){
        showAnswerImagesButton = <Button variant="contained" color="primary" onClick={props.onShowImages}>
                                    <Image />{` (${answer.images.length})`}
                                 </Button>
    }

    const deleteAnswerButton = props.user._id === answer.user._id ?
                               <DeleteButton 
                               onClick={
                                   () => props.onDeleteAnswer(
                                       props.token ,
                                       answer._id,
                                       answer.question
                                   )
                               }
                               />
                               : null 

    return(
        <div className={classes.answer} style={props.style}  >
            <div className={classes.header} >
                <div className={classes.user} >
                    <Link to={`/user/${answer.user._id}/followers`} >
                        <img src={picture} alt={answer.user.username}/>
                        {answer.user.username}
                        
                    </Link> 
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
                <span>
                    {showAnswerImagesButton}
                </span>
                {deleteAnswerButton}
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