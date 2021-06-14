import React , { Component , Fragment } from 'react';
import {Button} from '@material-ui/core';
import {PhotoCameraOutlined} from '@material-ui/icons';
import ImagesPreview from './Images Preview/images-preview';
import classes from './images-input.module.css';

class ImagesInput extends Component{
    constructor(){
        super();
        this.inputRef=React.createRef();
        this.state = {
            images : []
        }
    }

    onDeleteHandler = (id) => {
        this.setState( prevState => {
            const updatedImages = prevState.images.filter( image => {
                return image.id !== id
            } )
            this.props.onChange( 
                updatedImages.map( image => image.file )
            )
            return {
                images : updatedImages
            }
        } )
    }

    onFilesChangeHandler = () => {
        this.setState( prevState => {
            const images = [];
            for( let image of this.inputRef.current.files ){
                images.push(
                    {
                        file : image ,
                        id : Math.ceil(Math.random()*1000)
                    }
                )
            }
            const updatedImages = [...prevState.images , ...images];
            this.props.onChange( 
                updatedImages.map( image => image.file )
            )
            return {
                images : updatedImages
            }
        } )
        
    }
    
    render(){

        const images = this.state.images.map( image => image.file )

        const uploadButton = (
            <Fragment>
                <ImagesPreview
                images={this.state.images}
                onDeleteImage={this.onDeleteHandler}
                />
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={this.onFilesChangeHandler}
                    ref={this.inputRef}
                    files={images}
                    multiple
                />
                <label htmlFor="contained-button-file" style={{ margin : '2rem 0' }} >
                    <Button variant="contained" color="primary" component="span">
                        <PhotoCameraOutlined /><span className={classes.label}>Upload</span>
                    </Button>
                </label>
            </Fragment>
                
        )

        return(
            <Fragment>
                {uploadButton}
            </Fragment>
        )
    }
}

export default ImagesInput;