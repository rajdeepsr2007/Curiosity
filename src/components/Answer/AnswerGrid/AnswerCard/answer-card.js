import React from 'react';
import ReadOnlyEditor from '../../../Inputs/Read Only Editor/read-only-editor';
import baseURL from '../../../../baseURL';
import classes from './answer-card.module.css';
import { Button } from '@material-ui/core';
import { ThumbDown, ThumbUp } from '@material-ui/icons';

const formatDate = (date) => {
    const formattedDate = new Date(date);
    const presentDate = new Date();
    const timeDifference = presentDate.getTime() - formattedDate.getTime();
    if( timeDifference < 60000 ){
        return `${Math.floor(timeDifference/1000)} seconds ago`
    }
    else if(timeDifference < 3600000){
        return `${Math.floor(timeDifference/60000)} minutes ago`
    }
    else if(timeDifference < 3600000 * 24){
        return `${Math.floor(timeDifference/(3600000))} hours ago`
    }else if(timeDifference < 360000 * 24 * 30){
        return `${Math.floor(timeDifference/(3600000*24))} days ago`
    }else if(timeDifference < 360000 * 24 * 30 * 12){
        return `${Math.floor(timeDifference/(3600*24*30))} months ago`
    }else{
        return `${Math.floor(timeDifference/36000*24*30*12)} years ago`
    }
}

const AnswerCard = (props) => {

    const {answer} = props;

    let {picture} = answer.user;
    picture = baseURL + picture;

    return(
        <div className={classes.answer} >
            <div className={classes.header} >
                <div className={classes.user} >
                    <img src={picture} alt={answer.user.username}/>
                    {answer.user.username}
                </div>
                <div className={classes.title}>
                    <span className={classes.date} >
                        {formatDate(answer.createdAt)}
                    </span>
                </div>
            </div>
            <ReadOnlyEditor rawContent={answer.description} />
            <div className={classes.options} >
                <Button>
                    <ThumbUp /> 
                    <span className={classes.label}>{answer.upvotes}</span>
                </Button>
                <Button>
                    <ThumbDown />
                    <span className={classes.label}>{answer.downvotes}</span>
                </Button>
            </div>
        </div>
    )
}

export default AnswerCard;