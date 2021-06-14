import React , {Fragment} from 'react';
import { Delete, PhotoCameraOutlined } from '@material-ui/icons';
import classes from './images-preview.module.css'

const ImagesPreview = (props) => {
    const { images , preview } = props;
    if( images && images.length < 1 ){
        return (
            <div className={classes.imagespreview} >
                <PhotoCameraOutlined /> No Images Selected
            </div>
        )
    }

    let imageObjects;
    let wrapperStyle = null;

    if( preview ){
        imageObjects = images.map( image => {
            return (
                <div key={(Math.ceil(Math.random*1000))} className={classes.image} >
                    <img src={image} />
                </div>
            ) 
        } )
        wrapperStyle={width : '100%'}
    }else{
        imageObjects = images.map( image => {
            const imageSource = URL.createObjectURL(image.file);
            return <div key={image.id} className={classes.image} >
                <img src={imageSource} />
                <span className={classes.option} onClick={ () => props.onDeleteImage(image.id)}  >
                    <Delete />
                </span>
            </div> 
            
        } )
    }

    
    return (
        <div className={classes.imagespreview} style={wrapperStyle}>
            {imageObjects}
        </div>
    )
}

export default ImagesPreview;