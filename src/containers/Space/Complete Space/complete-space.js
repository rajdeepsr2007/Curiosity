import React, { Component } from 'react';
import Loader from '../../../components/UI/Loader/loader';
import {connect} from 'react-redux';
import SpaceGrid from '../../../components/Space/Space Grid/space-grid';
import HorizontalButtonGroup from '../../../components/Inputs/Horizontal Button Group/horizontal-button-group';
import { Fragment } from 'react';
import QuestionGrid from '../../../components/Question/QuestionGrid/question-grid';
import { Route } from 'react-router';
import * as actions from '../../../store/actions/index';
import Alert from '../../../components/UI/Feedback/Alert/alert';
import {Button} from '@material-ui/core';
import UserGrid from '../../../components/User/User Grid/user-grid';


class CompleteSpace extends Component{

    state={
        space : null
    }

    componentDidMount = () => {
        const spaceId = this.props.match.params.id;
        const space = this.props.spaces.find( space => space._id === spaceId );
        this.setState({ space });
        this.props.onLoadQuestions(
            this.props.token , 
            {
                spaces : [space._id]
            }    
        )
        this.props.onLoadUsers(
            this.props.token ,
            {
                space_followers : [space._id]
            }
        )
    }

    componentDidUpdate = () => {
        const space = this.props.spaces.find( space => space._id === this.state.space._id );
        if( space.follow !== this.state.space.follow ){
            this.setState({ space });
        }
    }

    loadQuestionsHandler = () => {
        this.props.onLoadQuestions(
            this.props.token , 
            {
                spaces : [this.state.space._id]
            }    
        )
    }

    render(){
        if( !this.state.space ){
            return <Loader />
        }
        const buttons = [
            { to : `/spaces/${this.state.space._id}/questions` , title : 'Questions'},
            { to : `/spaces/${this.state.space._id}/followers` , title : 'Followers'},
        ]
        const loadMoreQuestionsButton = (
            this.props.questionsShowing < this.props.questionsResults ? <div style={{ margin : '2rem 0' }} >
                                                                            <Button variant="contained" color="primary" onClick={this.loadQuestionsHandler} >
                                                                                Load More
                                                                            </Button>
                                                                        </div> : null
                            
        )
        const horizontalNavigation = (
            <HorizontalButtonGroup
            buttons={buttons}
            />
        )
        let questions;
        if( this.props.questionsLoading ){
            questions = <Loader />
        }else if( this.props.questionsError ){
            questions = <Alert alertType="error" size="big" text={this.props.error} />
        }else if( this.props.questions ){
            questions =(
                <Fragment>
                    <QuestionGrid 
                    questions={this.props.questions}
                    />
                    {
                        <Button variant="contained" disabled style={{ margin : '2rem 0' }}>
                            {'Showing ' + this.props.questionsShowing + ' of ' + this.props.questionsResults} Results
                        </Button>
                    }
                    {loadMoreQuestionsButton}
                </Fragment>
                
            ) 
        }else{
            questions = null;
        }


        let followers = <UserGrid 
                        users={this.props.users} 
                        filter={{ space_followers : [ this.state.space._id ] }}
                        />

        return (
            <Fragment>
                <SpaceGrid
                spaces={[this.state.space]}
                />
                {horizontalNavigation}
                <Route path={`/spaces/${this.state.space._id}/questions`} exact render={() => questions} />
                <Route path={`/spaces/${this.state.space._id}/followers`} exact render={() => followers} />
            </Fragment>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token,
        spaces : state.spaces.spaces,
        questions : state.questions.questions ,
        questionsLoading : state.questions.laoding ,
        questionsError : state.questions.error,
        questionsResults : state.questions.results,
        questionsShowing : state.questions.showing,
        users : state.users.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadQuestions : (token , filter) => dispatch(actions.loadQuestions(token , filter)),
        onLoadUsers : (token , filter) => dispatch( actions.loadUsers( token , filter ) )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CompleteSpace);