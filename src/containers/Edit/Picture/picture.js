import React , { Component } from 'react';
import axiosInstance from '../../../axiosInstance';
import classes from './picture.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import baseURL from '../../../baseURL';
import Loader from '../../../components/UI/Loader/loader';
import {PhotoCameraOutlined,CloudUploadOutlined , HomeOutlined} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import Alert from '../../../components/UI/Feedback/Alert/alert';


class Picture extends Component{

    state = {
        loading : true,
        error : null,
        src : null,
        success : null,
        submitting : false
    }

    changeFileHandler = (event) => {
        this.setState({ src : URL.createObjectURL(event.target.files[0]) })
    }

    saveChangesHandler = () => {
        this.setState({ submitting : true });
        setTimeout( () => {
            this.setState({ submitting : false })
        } , 5000)
    }

    goToHomeHandler = () => {
        this.props.history.replace('/home');
    }

    componentDidMount = () => {
        if( !this.state.src ){
            this.setState({ loading : true  })
            axiosInstance.get( '/api/user/picture' , {
                headers : {
                    "Authorization" : "Bearer " + this.props.token
                }
            } )
            .then( response => {
                if( response ){
                    this.setState( { loading : false , src : response.data.src } )
                }
            } )
            .catch(error => {
                this.setState({ error : 'Network Error' })
            })
        }
    }

    render(){

        let image = <Loader />

        if( this.state.src && !this.state.error){
            if(this.state.src[0] === '/'){
                image = <img src={baseURL + this.state.src} alt={'Your pic'} />
            }else{
                image = <img src={this.state.src} alt="Your pic" />
            }
        }
        const submitButton = !this.state.submitting ? <div className={classes.button} >
                                <Button variant="contained" color="primary" onClick={this.saveChangesHandler} >
                                   <CloudUploadOutlined /> <span className={classes.label}>Save Changes</span>
                                </Button>
                            </div> : <Loader />
        
        const goToHomeButton = !this.state.submitting ? <div className={classes.button} >
                                    <Button variant="contained" color="primary" onClick={this.goToHomeHandler} >
                                        <HomeOutlined /> <span className={classes.label}>Go To Home</span>
                                    </Button>
                                </div> : null

        return (
            <div className={classes.picture} >
                <h2>Edit Picture</h2>
                {this.state.success ? <Alert alertType="success" text={this.state.success} /> : null }
                {this.state.error ? <Alert alertType="error" text={this.state.error} /> : null }
                {image}
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={this.changeFileHandler}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        <PhotoCameraOutlined /><span className={classes.label}>Upload</span>
                    </Button>
                </label>
                {submitButton}
                {goToHomeButton}
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

export default connect(mapStateToProps)(withErrorHandler(Picture,axiosInstance));