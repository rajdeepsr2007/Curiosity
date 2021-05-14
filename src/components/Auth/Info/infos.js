import React from 'react';
import Info from './Info/info';
import classes from './infos.module.css';

const Infos = () => {

    const infoItems = [
        { logo : '' ,  description : 'Choose you areas of interest' },
        { logo : '' ,  description : 'Ask questions from experts' },
        { logo : '' ,  description : 'Find answers around vast number of topics' },
        { logo : '' ,  description : 'Keep your curiosity alive'}
    ]

    return (
        <div className={classes.infos} >
            <ul>
                {
                    infoItems.map( info => <li key={info.description} ><Info info={info} /></li> )
                }
            </ul>
        </div>
    )
}

export default Infos;