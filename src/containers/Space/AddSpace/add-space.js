import React , {Component , Fragment} from 'react';
import PageTitle from '../../../components/UI/PageTitle/page-title';
import TitleInput from '../../../components/Inputs/TitleInput/title-input';
import Dropdown from '../../../components/Inputs/Dropdown/dropdown';
import axiosInstance from '../../../axiosInstance';
import Loader from '../../../components/UI/Loader/loader';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import SpaceCard from '../../../components/Space/SpaceCard/space-card';

class AddSpace extends Component{
    state = {
        controls : {
            title : {
                value : ''
            },
            topic : {
                value : ''
            }
        },
        options : null,
        loading : true,
        error : null ,
        showErrors : false
    }

    changeInputHandler = (event,inputKey) => {
        const updatedControls = {
           title : this.state.controls.title,
           topic : this.state.controls.topic
        }
        updatedControls[inputKey].value = event.target.value;
        let error = null;
        if(event.target.value === ''){
            error = `${inputKey} can't be empty`
        }
        this.setState({ controls : updatedControls , error : error })
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
                <SpaceCard />
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