import React from 'react';
import { Editor , EditorState , convertFromRaw } from 'draft-js';
import classes from './read-only-editor.module.css';

const ReadOnlyEditor = (props) => {
    const editorState = convertFromRaw(JSON.parse(props.rawContent));
    return (
        <div className={classes.editor} >
            <Editor
            editorState={EditorState.createWithContent(editorState)}
            readOnly={true}
            />
        </div>
    )
}

export default ReadOnlyEditor;