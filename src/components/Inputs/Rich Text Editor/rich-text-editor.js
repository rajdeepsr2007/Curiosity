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

        const config = this.props.config ? 
                       this.props.config :
                       {
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        }

        return (
            <div className={classes.editor} style={this.props.style} >
                <Editor 
                editorState={this.state.editorState} 
                onEditorStateChange={this.onEditorStateChange}
                placeholder={ this.props.placeholder ? this.props.placeholder :  'Description...'}
                toolbar = {config}
                />
            </div>
        )
    }
}

export default TextEditor;