import React from 'react';
import { Fragment } from 'react';
import PollOption from './Poll Option/poll-option';

const A = 'A'.charCodeAt(0);
const numberToCharacter = number => String.fromCharCode(A + number)

const PollOptions = (props) => {
    const {options, onRemoveOption} = props;
    const optionsObject = options.map((option , index) => {
        return <PollOption
                key={option._id}
                option={option}
                label={numberToCharacter(index)}
                onRemoveOption={onRemoveOption}
                />
    })
    return(
        <Fragment>
            {optionsObject}
        </Fragment>
    )
}

export default PollOptions;
