import React from 'react';
import Badges from '../../../Inputs/Badges/badges';
import ReadOnlyEditor from '../../../Inputs/Read Only Editor/read-only-editor';
import baseURL from '../../../../baseURL';
import classes from './question-card.module.css';
import { Button } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { Link } from 'react-router-dom';

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
    }else if(timeDifference < 3600000 * 24 * 30){
        return `${Math.floor(timeDifference/(3600000*24))} days ago`
    }else if(timeDifference < 3600000 * 24 * 30 * 12){
        return `${Math.floor(timeDifference/(3600000*24*30))} months ago`
    }else{
        return `${Math.floor(timeDifference/3600000*24*30*12)} years ago`
    }
}

const QuestionCard = (props) => {

    const {question} = props;
    let {picture} = question.user;
    picture = baseURL + picture;

    const badges = [question.topic.title , question.space.title , ...question.badges];

    return (
        <div className={classes.question} >
            <div className={classes.header} >
                <div className={classes.user} >
                    <img src={picture} alt={question.user.username} />
                    {question.user.username}
                </div>
                <div className={classes.title}>
                    {question.title}
                    <span className={classes.date} >
                        {formatDate(question.createdAt)}
                    </span>
                </div>
            </div>
            <ReadOnlyEditor rawContent={question.description} />
            <div className={classes.badges} >
                <Badges 
                badges={badges} 
                showBadges
                />
            </div>
            <div className={classes.options} >
                <Link to={`/question/${question._id}/answers`}>
                    <Button variant="outlined" color="primary" >
                        {`View all ${question.answers.length} Answers`}
                    </Button>
                </Link>
                {
                    props.showAnswerButton ? <Link to={`/answer/${question._id}`} >
                                                <Button variant="outlined" color="primary" >
                                                    <Create /> Answer
                                                </Button>
                                            </Link> : null
                }
            </div>
        </div>
    )

}

export default QuestionCard;