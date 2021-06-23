import React , {Fragment} from 'react';
import baseURL from '../../../baseURL';
import { formatDateExact } from '../../util/util';
import { Link } from 'react-router-dom';
import ReadOnlyEditor from '../../Inputs/Read Only Editor/read-only-editor';
import classes from './poll-card.module.css';
import PollOptions from '../Poll Options/poll-options';
import {Button} from '@material-ui/core'
import { PanTool } from '@material-ui/icons';

const PollCard = (props) => {
    const {poll , onRemoveOption , onVote } = props;
    const user = poll.user;
    const pollCard = (
        <div className={classes.card} >
            <div className={classes.user} >
                <Link to={`/user/${user._id}/followers`}>
                    <img src={baseURL + user.picture} alt={user.username} />
                    <span>{user.username}</span>
                </Link>
                <span className={classes.date} >
                    {formatDateExact(
                        poll.createdAt
                    )}
                </span>
            </div>
            {
                poll.description ? 
                <ReadOnlyEditor
                rawContent={poll.description}
                />
                : null
            }
            <PollOptions
            onRemoveOption={onRemoveOption}
            onVote={onVote}
            poll={poll}
            />
            {
               onVote ? <div className={classes.info} >
                    <Button disabled >
                        {poll.votes} <PanTool style={{ margin : '0 0 0 0.5rem' }}/>
                    </Button>
                </div> : null
            }   
        </div>
    )
    return(
        <Fragment>
            {pollCard}
        </Fragment>
    )
}

export default PollCard;