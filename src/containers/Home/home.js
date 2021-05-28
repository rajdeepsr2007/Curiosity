import React , { Component , Fragment } from 'react';
import {connect} from 'react-redux';
import axiosInstance from '../../axiosInstance';
import Loader from '../../components/UI/Loader/loader';
import * as actions from '../../store/actions/';
import PageTitle from '../../components/UI/PageTitle/page-title';
import QuestionGrid from '../../components/Question/QuestionGrid/question-grid';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Button } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import Alert from '../../components/UI/Feedback/Alert/alert';
import QuestionFilter from '../../components/Home/QuestionFilter/question-filter';
import classes from './home.module.css';

class Home extends Component{

    state = {
        userTopics : [] ,
        userSpaces : [] ,
        showFilter : false
    }

    onFilterChange = (type , id) => {
            if( type === 'topic' ){
                const updatedUserTopics = [];
                for( let topic of this.state.userTopics ){
                    let selected = topic.selected;
                    if( topic._id === id && selected ){
                        selected = false;
                    }else if( topic._id === id ){
                        selected = true;
                    }
                    updatedUserTopics.push({ ...topic, selected : selected})
                }
                this.setState({ userTopics : updatedUserTopics })
            }else{
                const updatedUserSpaces = [];
                for( let space of this.state.userSpaces ){
                    let selected = space.selected;
                    if( space._id === id && selected ){
                        selected = false;
                    }else if( space._id === id ){
                        selected = true;
                    }
                    updatedUserSpaces.push({ ...space, selected : selected })
                }
                this.setState({ userSpaces : updatedUserSpaces })
            }
    }

    toggleShowFilter = () => {
        const updatedShowFilter = this.state.showFilter;
        this.setState({ showFilter : !updatedShowFilter })
    }

    componentDidMount = () => {
        this.props.onLoadQuestions(this.props.token);
        this.setState({ userTopics : this.props.user.topics , userSpaces : this.props.user.spaces });
    }

    onRefreshHandler = () => {
        this.props.onLoadQuestions(this.props.token);
    }

   render(){
       if( this.props.loading ){
           return <Loader />
       }

       const refreshButton = (
            
                <Button variant="outlined" color="primary" onClick={this.onRefreshHandler}>
                    <Replay /> Refresh 
                </Button>
            
       )

       let questionFilter = null;
       let showFilter = null;
       if( this.state.userTopics.length > 0 || this.state.userSpaces.length > 0 ){
            questionFilter = <QuestionFilter 
                            topics={this.state.userTopics} 
                            spaces={this.state.userSpaces} 
                            onClick={this.toggleShowFilter}
                            onChange={this.onFilterChange}
                            />
            showFilter = <Button variant="outlined" color="primary" onClick={this.toggleShowFilter} >
                {this.state.showFilter ? 'Hide' : 'Show'} Filter
            </Button>
       }



       return (
           <Fragment>
               <PageTitle>Home</PageTitle>
               <div className={classes.options} >
                    {showFilter}
                    {refreshButton}
               </div>
               {this.props.error ? <Alert alertType="error" text={this.props.error} /> : null }
               {this.props.questions ? <QuestionGrid questions={this.props.questions} /> : null }
               {this.state.showFilter ? questionFilter : null}
           </Fragment>
       )
   }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token,
        loading : state.questions.loading,
        questions : state.questions.questions,
        error : state.questions.error,
        user : state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadQuestions : (token) => dispatch(actions.loadQuestions(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Home,axiosInstance));