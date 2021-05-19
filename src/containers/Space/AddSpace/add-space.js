import React , {Component , Fragment} from 'react';
import PageTitle from '../../../components/UI/PageTitle/page-title';
import TitleInput from '../../../components/Inputs/TitleInput/title-input';
import Dropdown from '../../../components/Inputs/Dropdown/dropdown';
import axiosInstance from '../../../axiosInstance';
import Loader from '../../../components/UI/Loader/loader';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import SpaceCard from '../../../components/Space/SpaceCard/space-card';
import {Button} from '@material-ui/core';
import {Create, PhotoCameraOutlined} from '@material-ui/icons';
import Alert from '../../../components/UI/Feedback/Alert/alert';

class AddSpace extends Component{

    constructor (){

        super();

        this.state = {
            controls : {
                title : {
                    value : '',
                },
                topic : {
                    value : '-',
                }
            },
            options : null,
            loading : true,
            error : null ,
            showErrors : false,
            src : ''
        }

        this.inputFileRef = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(this.state.controls.title.value === '' || this.state.controls.topic.value === '-'){
            this.setState({ showErrors : true , error : 'Please fill out all the fields'})
        }else if( !this.state.src){
            this.setState({ showErrors : true , error : 'Please select a background image file'})
        }else{
            this.setState({ loading : true , error : null ,success : null ,showErrors : false })
            axiosInstance.post('/api/spaces/create')
            .then( response => {
                if(response){
                    if( response.data.success ){
                        this.setState( { loading : false , success : response.data.message } )
                    }else{
                        this.setState({ loading : false , error : response.data.message })
                    }
                }else{
                    this.setState({ loading : false , error : 'Network Error' })
                }
            } )
        }
    }

    changeFileHandler = () => {
        this.setState({ src : URL.createObjectURL(this.inputFileRef.current.files[0]) });
    }

    changeInputHandler = (event,inputKey) => {
        const updatedControls = {
           title : this.state.controls.title,
           topic : this.state.controls.topic
        }
        updatedControls[inputKey].value = event.target.value;
        this.setState({ controls : updatedControls })
    }

    componentDidMount = () => {
        if( !this.state.options ){
            axiosInstance.get('/api/user/topics',{
                headers : {
                    "Authorization" : "Bearer " + this.props.token
                }
            })
            .then( response => {
                if( response ){
                    const options = response.data.topics.map( topic => {
                        return {
                            value : topic._id ,
                            title : topic.title
                        }
                    } )
                    this.setState({ loading : false , options : options })
                }else{
                    this.setState({ loading : false , error : 'Network Error' })
                }
            } )
        }
    }

    render(){

        if( this.state.loading ){
            return <Loader />
        }

        let spaceTitle = '';
        if( this.state.options ){
            for( let option of this.state.options ){
                if( option.value == this.state.controls.topic.value ){
                    spaceTitle = option.title
                    break;
                }
            }
        }

        const space = {
            image : this.state.src,
            title : this.state.controls.title.value,
            topic : {
                title : spaceTitle    
            }
        }

        return (
            <Fragment>
                <PageTitle>Add Space</PageTitle>
                <TitleInput 
                label="Space Title" 
                onChange={(event) => this.changeInputHandler(event ,'title')} 
                value={this.state.controls.title.value}
                />
                <Dropdown 
                onChange={(event) => this.changeInputHandler(event ,'topic')}
                value={this.state.controls.topic.value}
                label="Topic"
                options = {this.state.options}
                />
                <SpaceCard space={space} onClick={() => {}} />
                <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display : 'none' }}
                    ref={this.inputFileRef}
                    onChange={this.changeFileHandler}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" style={{margin : '2rem 0'}} >
                        <PhotoCameraOutlined /><span style={{margin : '0 1rem'}}>Change Background</span>
                    </Button>
                </label>
                {this.state.error && this.state.showErrors ? <Alert alertType="error" size="big" text={this.state.error} />:null}
                {this.state.success ? <Alert alertType="success" size="big" text={this.state.success} />:null}
                <Button variant="contained" color="primary" onClick={this.submitHandler} >
                    <Create />Create Space
                </Button>
            </Fragment>   
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

export default connect(mapStateToProps)(withErrorHandler(AddSpace,axiosInstance));