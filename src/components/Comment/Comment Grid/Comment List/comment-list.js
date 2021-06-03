import { Create } from '@material-ui/icons';
import React from 'react';
import { Fragment } from 'react';
import Loader from '../../../UI/Loader/loader';
import CommentCard from './Comment Card/comment-card';
import classes from './comment-list.module.css'

const CommentList = (props) => {

    let content;
    if( props.loading ){
        content=<Loader />
    }else{
        if( props.comments && props.comments.length > 0 ){
            content = props.comments.map( comment => {
                return <CommentCard 
                        key={comment._id}
                        comment={comment}
                        />
            } )
        }else{
            content = (
                <Fragment>
                    <span style={{width : '100%' , textAlign : 'center'}} >
                        <Create />
                        <p>No Comments</p>
                    </span>
                </Fragment>
                
            )
        }
        
    }

    return (
        <div className={classes.comments} >
            {content}
        </div>
    )
}

export default CommentList;