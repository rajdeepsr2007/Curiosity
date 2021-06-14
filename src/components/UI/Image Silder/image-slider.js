import React , {Component , Fragment} from 'react';
import Backdrop from '../Modal/Backdrop/backdrop';
import { Close, NavigateBefore, NavigateNext } from '@material-ui/icons';
import classes from './image-slider.module.css'

class ImageSilder extends Component{
    state={
        images : this.props.images ,
        selected : 0
    }

    onImageChangeHandler = (increment) => {
        let updatedSelected;
        if( increment === 1 ){
            updatedSelected = (this.state.selected + 1)%this.state.images.length;
            this.setState({ selected : updatedSelected })
        }else{
            if( this.state.selected === 0 ){
                updatedSelected = this.state.images.length - 1;
            }else{
                updatedSelected = this.state.selected - 1;
            }
            this.setState({ selected : updatedSelected })
        }
    }

    selectImageHandler = (index) => {
        this.setState({ selected : index })
    }

    render(){

        const image = (
            <img src={this.state.images[this.state.selected]} />
        )

        let nextImageButton = null , previousImageButton = null ;
        nextImageButton = (
            <div className={classes.button} onClick={() => this.onImageChangeHandler(1)} >
                <NavigateNext />
            </div>
        )
        previousImageButton = (
            <div className={classes.button} onClick={() => this.onImageChangeHandler(-1)} >
                <NavigateBefore />
            </div>
        )

        
        const closeButton = (
            <div className={classes.close} onClick={this.props.onClose}>
                <Close />
            </div>
        )

        const dotNavigation = this.state.images.map( (image,index) => {
            const dotClass = this.state.selected === index ? classes.selected : null;
            return <div className={dotClass} onClick={() => this.selectImageHandler(index)} >
                   </div>
        } )

        const slider = (
            <div className={classes.slider}>
                <div className={classes.label} >
                    <span>{this.state.selected+1} of {this.state.images.length}</span>
                </div>
                <div className={classes.images} >
                    {previousImageButton}
                    {image}
                    {nextImageButton}
                    {closeButton}
                </div> 
                <div className={classes.navigation} >
                    {dotNavigation}
                </div> 
            </div>
        )

        return(
            <Fragment>
                <Backdrop show onClick={this.props.onClick} />
                {slider}
            </Fragment>
        )
    }
}

export default ImageSilder;