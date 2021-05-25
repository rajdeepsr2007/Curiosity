import React , { Component } from 'react';
import {EditorState, convertToRaw } from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import classes from './editor.module.css'
import './react-draft-wysiwyg.customcss'

class TextEditor extends Component{
    constructor(){
        super()
        this.state = {
            content : EditorState.createEmpty()
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
        if( this.props.onChange ){
            this.props.onChange(
                JSON.stringify(
                    convertToRaw(editorState.getCurrentContent() )
                )
            )
        }
    }

    render(){
        return (
            <div className={classes.editor} >
                <Editor 
                editorState={this.state.editorState} 
                onEditorStateChange={this.onEditorStateChange}
                placeholder={'Description...'}
                toolbar = {{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                }}
                />
            </div>
        )
    }
}

export default TextEditor;