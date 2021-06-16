import React , {Component , Fragment} from 'react';
import PageTitle from '../../../components/UI/PageTitle/page-title';
import { Create } from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';
import TextEditor from '../../../components/Inputs/Rich Text Editor/rich-text-editor';
import { Button } from '@material-ui/core';
import axiosInstance from '../../../axiosInstance';
import Loader from '../../../components/UI/Loader/loader';
import Alert from '../../../components/UI/Feedback/Alert/alert';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';


class EditDescription extends Component{
    state={
        description : null ,
        error : null ,
        success : null,
        submitting : false
    }

    onSubmitHandler = () => {
        this.setState({ submitting : true , error : null , success : null })
        axiosInstance.post('/api/user/edit-description',{ description : this.state.description },{
            headers : {
                "Authorization" : "Bearer " + this.props.token
            }
        })
        .then( response => {
            if( response ){
                this.setState({ submitting : false , success : 'Changes Saved' })
            }else{
                this.setState({ submitting : false , error : 'Network Error' })
            }
        } )
        .catch(error => {
            this.setState({ submitting : false , error : error.message })
        })
    }

    onDescriptionChangeHandler = (description) => {
        this.setState({ description })
    }

    render(){

        const saveButton = this.state.submitting ? <Loader /> : (
            <div style={{ margin : '2rem 0' }} >
                <Button variant="contained" color="primary" onClick={this.onSubmitHandler} >
                    Save
                </Button>
            </div>
        )

        return(
           <Fragment>
               <PageTitle><Create /> Description</PageTitle>
               <h3 style={{ color : blue[300] , textAlign : 'center', fontFamily : 'sans-serif' , margin : '2rem 0'}}>Tell Something About Yourself</h3>
               <TextEditor 
               placeholder="Tell Something About Yourself"
               onChange={this.onDescriptionChangeHandler}
               />
               { this.state.error ? <Alert alertType="error" text={this.state.error} /> : null }
               { this.state.success ? <Alert alertType="success" text={this.state.success} /> : null }
               {saveButton}
           </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        token : state.auth.token ,
    }
}

export default connect(mapStateToProps)(withErrorHandler(EditDescription,axiosInstance));
