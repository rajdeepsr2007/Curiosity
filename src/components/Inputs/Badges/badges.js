import React , { Component } from 'react';
import {TextField} from '@material-ui/core';
import { Fragment } from 'react';
import Badge from './Badge/badge';
import classes from './badges.module.css'

class Badges extends Component{
    state = {
        badges : this.props.badges ? this.props.badges : [],
        value : ''
    }

    onChange = (event) => {
        let updatedBadges = event.target.value.trim().split(' ');
        let updatedValue = updatedBadges.join(' ');
        if( event.target.value[event.target.value.length - 1] === ' ' ){
            updatedValue = updatedValue + ' ';
        }
        if( updatedBadges.length === 1 && updatedBadges[0].trim().length === 0 ){
            updatedBadges = [];
        }
        this.setState({ badges : updatedBadges ,  value : updatedValue })
        this.props.onChange(updatedBadges);
    }

    onDeleteHandler = (inputBadge) => {
        this.setState( ( prevState , props ) => {
            const updatedBadges = prevState.badges.filter( badge => badge !== inputBadge )
            return {
                ...prevState ,
                badges : updatedBadges,
                value : updatedBadges.join(' ')
            }
        })
    }

    render(){

        const style={ width : '80%' , padding : '1rem 0'}

        return(
            <Fragment>
                <TextField
                variant="outlined"
                style={style}
                multiline
                label="Badges"
                value={this.state.value}
                rows={1}
                InputLabelProps = {{ style : { marginTop : '1rem' } }}
                onChange={ this.onChange }
                />
                {
                    this.state.badges.length ? <div className={classes.badges} >
                                                    {
                                                        this.state.badges.map(badge => {
                                                            return <Badge 
                                                                    key={badge} 
                                                                    badge={badge} 
                                                                    onDelete={() => this.onDeleteHandler(badge)} 
                                                                    />
                                                        })
                                                    }
                                                </div> : null
                }
            </Fragment>
            
        )
    }
}

export default Badges;