import React from 'react';
import {Button} from '@material-ui/core';
import RichTextEditor from '../../../Inputs/Rich Text Editor/rich-text-editor';
import Loader from '../../../UI/Loader/loader';
import classes from './add-comment.module.css'

const AddComment = props => {

    const editorConfig = {
        options: ['emoji'],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        } 

    const editorStyle = { width : '100%' }

    const addCommentButton = props.loading ? 
                             <Loader /> :
                             <div className={classes.button} >
                                <Button 
                                variant="contained"
                                color="primary"
                                onClick={props.onAddComment}
                                >
                                    Add Comment
                                </Button>
                             </div>
                             
    return (
        <div className={classes.add}>
            <RichTextEditor
            onChange={props.onChange}
            style={editorStyle}
            config={editorConfig}
            placeholder="Add Comment"
            />
            {addCommentButton}
        </div>
    )
}

export default AddComment;