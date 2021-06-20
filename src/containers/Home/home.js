import React , { Component , Fragment } from 'react';
import {connect} from 'react-redux';
import axiosInstance from '../../axiosInstance';
import Loader from '../../components/UI/Loader/loader';
import * as actions from '../../store/actions/';
import PageTitle from '../../components/UI/PageTitle/page-title';
import QuestionGrid from '../../components/Question/QuestionGrid/question-grid';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Button } from '@material-ui/core';
import { FilterList, HomeOutlined, Replay } from '@material-ui/icons';
import Alert from '../../components/UI/Feedback/Alert/alert';
import QuestionFilter from '../../components/Home/QuestionFilter/question-filter';
import classes from './home.module.css';
import { PureComponent } from 'react';
import { Redirect } from 'react-router';

class Home extends PureComponent{

    state = {
        userTopics : [] ,
        userSpaces : [] ,
        showFilter : false,
        appliedFilters : 0,
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

    onApplyfilter = () => {
       this.onRefreshHandler(false);
       this.toggleShowFilter();
    }

    toggleShowFilter = () => {
        const updatedShowFilter = this.state.showFilter;
        this.setState({ showFilter : !updatedShowFilter })
    }

    componentDidMount = () => {
        this.props.onLoadQuestions(this.props.token , null , true );
        this.setState({ userTopics : this.props.user.topics , userSpaces : this.props.user.spaces });
    }

    componentDidUpdate = (prevProps , prevState) => {
        if( prevProps.showing !== this.state.showing ){
            window.scrollTo(0 , document.body.scrollHeight - 2500)
        }
    }

    onLoadMoreHandler = () => {
        this.onRefreshHandler(false);
    }

    onRefreshHandler = (refresh) => {
       let topics = this.state.userTopics.filter( topic => topic.selected );
       let spaces = this.state.userSpaces.filter( space => space.selected );
       topics = topics.map( topic => topic._id );
       spaces = spaces.map( space => space._id );
       if( topics.length > 0 || spaces.length > 0 ){
            this.props.onLoadQuestions( this.props.token , { spaces , topics } , refresh);
       }else{
            this.props.onLoadQuestions(this.props.token , null ,refresh);
       }
       this.setState({ appliedFilters : topics.length + spaces.length })
    }

   render(){

      const loadMoreCount = this.props.results - this.props.showing > 4 ? 5 : this.props.results - this.props.showing;

      let loadMoreButton  = this.props.showing < this.props.results ? <div className={classes.button} >
           <Button variant="contained" color="primary" onClick={this.onLoadMoreHandler} >
               {`Load More(${loadMoreCount})`}
           </Button>
       </div> : <p>That's all for now</p>

       if( this.props.loading ){
           return <Loader />
       }

       const refreshButton = (
            
                <Button variant="outlined" color="primary" onClick={() => this.onRefreshHandler(true)}>
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
                            onApplyFilter={() => this.onApplyfilter()}
                            />
            showFilter = <Button variant="outlined" color="primary" onClick={this.toggleShowFilter} >
                <FilterList /> {this.state.showFilter ? 'Hide' : 'Show'} Filter {`(${this.state.appliedFilters})`}
            </Button>
       }

       return (
           <Fragment>
               {/* <Redirect to="/noti" /> */}
               <PageTitle><HomeOutlined /> Home</PageTitle>
               <div className={classes.options} >
                    {showFilter}
                    {refreshButton}
               </div>
               {this.props.error ? <Alert alertType="error" text={this.props.error} /> : null }
               {this.props.questions ? <QuestionGrid questions={this.props.questions} /> : null }
               {this.state.showFilter ? questionFilter : null}
               {
                        <Button variant="contained" disabled >
                            {'Showing ' + this.props.showing + ' of ' + this.props.results} Results
                        </Button>
                }
               {loadMoreButton}
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
        user : state.auth.user,
        results : state.questions.results,
        showing : state.questions.showing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadQuestions : (token , filter , refresh) => dispatch(actions.loadQuestions(token , filter ,refresh ))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Home,axiosInstance));