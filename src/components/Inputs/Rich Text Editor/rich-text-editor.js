import React , { Component } from 'react';
import RichTextEditor from 'react-rte';

class TextEditor extends Component{

    state = {
        value : RichTextEditor.createEmptyValue()
    }

    onChange = (value) => {
        this.setState({ value : value })
        if( this.props.onChange ){
            this.props.onChange(
                value.toString('html')
            )
        }
    }

    render(){
        return(
            <RichTextEditor
            value={this.state.value}
            onchange={this.onChange}
            />
        )
    }
}

export default TextEditor;