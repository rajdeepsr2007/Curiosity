import React from 'react';
import baseURL from '../../../../../baseURL';
import ReadOnlyEditor from '../../../../Inputs/Read Only Editor/read-only-editor';
import {formatDate} from '../../../../util/util';
import classes from './comment-card.module.css';

const CommentCard = (props) => {
    const {comment} = props;
    const userPicture = baseURL + comment.user.picture; 
    const editorStyle = {margin : '0 0 0 2rem'}
    return (
        <div className={classes.card} >
            <div className={classes.info} >
                <div className={classes.user} >
                    <img src={userPicture} />
                    {comment.user.username}
                </div>
                <ReadOnlyEditor
                rawContent={comment.description}
                style={editorStyle}
                />
            </div>
            <span className={classes.date} >
                {formatDate(comment.createdAt)}
            </span>
        </div>
    )
}

export default CommentCard;