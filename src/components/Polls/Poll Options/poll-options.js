import React from 'react';
import { Fragment } from 'react';
import PollOption from './Poll Option/poll-option';

const A = 'A'.charCodeAt(0);
const numberToCharacter = number => String.fromCharCode(A + number)

const PollOptions = (props) => {
    const {poll, onRemoveOption ,onVote} = props;
    const optionsObject = poll.options.map((option , index) => {
        const percentage = poll.votes > 0 ?
                            Math.floor((option.votes/poll.votes) * 100)
                            : 0
        return <PollOption
                key={option._id}
                option={option}
                label={numberToCharacter(index)}
                onRemoveOption={onRemoveOption}
                onVote={onVote}
                selected={poll.selected}
                percentage={percentage}
                />
    })
    return(
        <Fragment>
            {optionsObject}
        </Fragment>
    )
}

export default PollOptions;
