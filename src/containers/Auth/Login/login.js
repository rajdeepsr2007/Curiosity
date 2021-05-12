import React , { Component } from 'react';
import {InputBase, TextField} from '@material-ui/core';
import classes from './login.module.css';
import {Button} from '@material-ui/core';

class Login extends Component{

    state={
        controls:{
            email : {
                type : null,
                label : 'Email or Username',
                value : '',
                isValid : false ,
                touched : false,
                error : null ,
                validation : {
                    rules : {
                        isEmail : true ,
                        isUnique : true
                    }
                }
            },
            password : {
                type : 'password',
                value : '',
                label : 'Password',
                isValid : false ,
                touched : false,
                error : null ,
                validation : {
                    rules : {
                        isPassword : true
                    }
                }
            }
        },
        isFormValid : false
    }

    inputChangeHandler = (event,inputKey) => {
        this.setState( (prevState , props) => {
            let updatedControls={};
            for( const key in prevState.controls ){
                updatedControls = {
                    ...updatedControls,
                    [key] : { ...prevState.controls[key] }
                }
            }
            updatedControls[inputKey].value = event.target.value;
            updatedControls[inputKey].touched = true;
            updatedControls[inputKey].valid = updatedControls[inputKey].value!=='';

            let isFormValid = true;
            for( const key in this.state.controls ){
                if( !updatedControls[key].valid ){
                    isFormValid = false;
                }
            }
            return {
                ...prevState ,
                controls : updatedControls,
                isFormValid
            }
        } )
    }

    render(){

        const formInputs = [];
        for( let key in this.state.controls ){
            const input = this.state.controls[key];
            formInputs.push(
                <div className={classes.input} key={key} >
                    <TextField
                    type={input.type}
                    value={input.value}
                    error={input.error}
                    label={input.label}
                    onChange={ (event) => this.inputChangeHandler(event,key) }
                    />
                </div>
            )
        }

        const submitButton = <div className={classes.button} >
                <Button 
                variant="contained" 
                color="primary"
                disabled={!this.state.isFormValid}>Login</Button>
            </div>

        return(
            <div className={classes.form} >
                <form onSubmit={this.submitFormHandler} >
                    {formInputs}
                    {submitButton}
                </form>  
            </div>
            
        )
    }
}

export default Login;