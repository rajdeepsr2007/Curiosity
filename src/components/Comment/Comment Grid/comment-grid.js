import React , {Component} from 'react';
import { Fragment } from 'react';
import Loader from '../../UI/Loader/loader';
import AddComment from './Add Comment/add-comment';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import CommentList from './Comment List/comment-list';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axiosInstance from '../../../axiosInstance';
import classes from './comment-grid.module.css';

class CommentGrid extends Component{

    state = {
        showAddComment : false,
        showComments : false,
        answer : null,
        description : null
    }

    onCommentChangeHandler = (description) => {
        this.setState({ description })
    }

    addCommentHandler = () => {
        if(this.state.description!== null){
            this.props.onAddComment(
                this.props.token , 
                this.state.answer._id ,
                this.state.description
            )
        }
    }

    componentDidMount = () => {
        this.setState({ answer : this.props.answer })
    }

    toggleShowComments = () => {
        const updatedshowComments = !this.state.showComments;
        if( updatedshowComments ){
            this.props.onLoadComments(
                this.props.token,
                this.state.answer._id
            )
        }
        this.setState({ showComments : updatedshowComments , showAddComment : false })
    }

    toggleShowAddComment = () => {
        const updatedShowAddComment = !this.state.showAddComment;
        this.setState({ showComments : false , showAddComment : updatedShowAddComment })
    }


    render(){
        if( !this.state.answer ){
            return <Loader />
        }

        let commentslist;
        if( this.state.showComments ){
            let loading = false;
            if( this.props.loading && this.props.loading.answerId === this.state.answer._id && this.props.loading.type === 'loading' ){
                loading = true;
            }
            commentslist = <CommentList comments={this.props.comments[this.state.answer._id]} loading={loading} />
        }

        let addComment = null;
        if( this.state.showAddComment ){
            let loading = false;
            if( this.props.loading && this.props.loading.answerId === this.state.answer._id && this.props.loading.type==='add' ){
                loading = true;
            }
            addComment = <AddComment 
                        loading={loading} 
                        onChange={this.onCommentChangeHandler} 
                        onAddComment={this.addCommentHandler}
                        />
        }
        const toggler = <div className={classes.toggler} >
            <span 
            onClick={this.toggleShowComments} 
            >
                {this.state.showComments ? 'Hide' : 'Show'} Comments{`(${this.props.answer.comments.length})`}
            </span>
            <span 
            onClick={this.toggleShowAddComment}
            >
                Add Comment
            </span>
        </div>
        return(
            <Fragment>
                {toggler}
                {commentslist}
                {addComment}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token ,
        loading : state.comments.loading,
        comments : state.comments.comments ,
        error : state.comments.error ,
        success : state.comments.success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadComments : (token , answerId) => dispatch(actions.loadComments(token , answerId)),
        onAddComment : (token , answerId , description) => dispatch(actions.addComment(token , answerId , description)),
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(CommentGrid,axiosInstance));