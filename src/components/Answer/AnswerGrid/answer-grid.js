import React , { Component , Fragment} from 'react';
import AnswerCard from './AnswerCard/answer-card';
import { Create } from '@material-ui/icons';
import classes from './answer-grid.module.css';
import baseURL from '../../../baseURL';
import ImageSilder from '../../UI/Image Silder/image-slider';

class AnswerGrid extends Component{

    state={
        showImages : null
    }

    toggleShowImages = (id) => {
        if(id){
            this.setState({ showImages : id })
        }else{
            this.setState({ showImages : null })
        }
    }
    
    render(){
        const {answers , style} = this.props;

        let content = <div className={classes.answers} >
            <Create /> 
            <span className={classes.label}>No Answers Yet</span>
        </div>

        let answer = null , imageObjects = null , images = null;
        if( this.state.showImages ){
            answer = answers.find( answer => answer._id === this.state.showImages )
            if( answer ){
                imageObjects = answer.images.map( image => baseURL + image );
                images = <ImageSilder images={imageObjects} onClose={this.toggleShowImages} />
            } 
        }

        if( answers && answers.length > 0 ){
            content = answers.map( answer => {
                return (
                    <AnswerCard
                    key={answer._id}
                    answer = {answer}
                    onShowImages={() => this.toggleShowImages(answer._id)}
                    style={{ width : '100%' }}
                    />
                )
            })
        }

        return (
            <Fragment>
                <div className={classes.answersgrid} style={style} >
                    {content}
                </div>
                {images}
            </Fragment>
        )
    }  
}

export default AnswerGrid;