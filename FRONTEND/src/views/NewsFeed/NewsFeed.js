import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import socket from "../../service/socket";

import { getPosts, deletePost, likePost, unLikePost, createComment } from "../../actions/postActions";
import { getSuggestions, followUser, unfollowUser } from "../../actions/userActions";

import Posts from "./Posts/Posts";
import Suggestions from "./Suggestions/Suggestions";
import SuggestionBoxes from "./SuggestionBoxes/SuggestionBoxes";

import PostMenuModal from "../Modal/PostMenuModal/PostMenuModal";
import CommentModal from "../Modal/CommentModal/CommentModal";

import "./NewsFeed.css";

class NewsFeed extends Component {

    constructor() {
        super();
        this.state = {
            openPostMenuModal: false,
            openCommentModal: false,
            socketConnected: false,
            postsProps: null
        }

        this.postsComponent = React.createRef();
        this.modalRef = React.createRef();
    }

    componentWillReceiveProps() {
        // if (this.props.errors['error']) {
        //     // let error_message= this.props.errors['message'];
        //     if (window.confirm("There is something problem in sockets please refresh this page to resolve this issue...")) {
        //         console.log("PAGE REFRESHED...");
        //         window.reload(true);
        //     }
        // }
        if (!this.props.posts.getPostsLoading) {
            this.setState({ postsProps: this.props.posts });
        }

        if (this.props.auth.isAuthenticated && !this.state.socketConnected) {
            this.socketOn();
            this.setState({ socketConnected: true })
        }
    }

    componentDidMount() {
        this.props.getPosts();
        this.props.getSuggestions();
        // this.socketOn();
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.socketOff();
    }

    socketOn() {
        let socketEvent = socket(this.props.auth.user['_id']);
        socketEvent.on("getPosts", this.onGetPostsSocketEventHandler);
        socketEvent.on("createPost", this.onCreatePostSocketEventHandler);
        socketEvent.on("updatePost", this.onUpdatePostSocketEventHandler);
        socketEvent.on("deletePost", this.onDeletePostSocketEventHandler);
        socketEvent.on("likePost", this.onLikePostSocketEventHandler);
        socketEvent.on("unlikePost", this.onUnlikePostSocketEventHandler);
        socketEvent.on("commentPost", this.onCommentPostSocketEventHandler);
        socketEvent.on('followUser', this.onFollowUserSocketEventHandler);
        socketEvent.on('unfollowUser', this.onUnfollowUserSocketEventHandler);
    }

    socketOff() {
        let socketEvent = socket(this.props.auth.user['_id']);
        socketEvent.off("getPosts", this.onGetPostsSocketEventHandler);
        socketEvent.off("createPost", this.onCreatePostSocketEventHandler);
        socketEvent.off("updatePost", this.onUpdatePostSocketEventHandler);
        socketEvent.off("deletePost", this.onDeletePostSocketEventHandler);
        socketEvent.off("likePost", this.onLikePostSocketEventHandler);
        socketEvent.off("unlikePost", this.onUnlikePostSocketEventHandler);
        socketEvent.off("commentPost", this.onCommentPostSocketEventHandler);
        socketEvent.off('followUser', this.onFollowUserSocketEventHandler);
        socketEvent.off('unfollowUser', this.onUnfollowUserSocketEventHandler);
    }

    onGetPostsSocketEventHandler = () => {
        this.postsComponent.current.forceUpdate();
    }

    onCreatePostSocketEventHandler = (post) => {
        let posts = this.state.postsProps.posts;
        posts.unshift(post);
        this.setState({ postsProps: { ...this.state.postsProps, posts: posts } });
    }

    onDeletePostSocketEventHandler = (post_id) => {
        let posts = this.state.postsProps.posts;
        let index = posts.findIndex(post => post._id === post_id);
        posts.splice(index, 1);
        this.setState({ postsProps: { ...this.state.postsProps, posts: posts } });
        this.postMenuModal.current.closeModal();
    }

    onUpdatePostSocketEventHandler = (post) => {
    }

    onLikePostSocketEventHandler = ({ post_id, user_id }) => {
        let posts = this.state.postsProps.posts;
        let index = posts.findIndex(post => post._id === post_id);
        posts[index]['likes'].unshift({ user: user_id });
        this.setState({ postsProps: { ...this.state.postsProps, posts: posts } });
        this.postsComponent.current.forceUpdate();
    }

    onUnlikePostSocketEventHandler = ({ post_id, user_id }) => {
        let posts = this.state.postsProps.posts;
        let index = posts.findIndex(post => post._id === post_id);
        let removed_like_index = posts[index]['likes'].findIndex(like => like.user === user_id);
        posts[index]['likes'].splice(removed_like_index, 1);
        this.setState({ postsProps: { ...this.state.postsProps, posts: posts } });
        this.postsComponent.current.forceUpdate();
    }

    onCommentPostSocketEventHandler = ({ post_id, comment }) => {
        let posts = this.state.postsProps.posts;
        let index = posts.findIndex(post => post._id === post_id);
        posts[index]['comments'].unshift(comment);
        this.setState({ postsProps: { ...this.state.postsProps, posts: posts } });
        this.postsComponent.current.forceUpdate();
    }

    onFollowUserSocketEventHandler = (res) => {
        let auth_user = this.props.auth.user;
        if (
            auth_user['_id'] === res['current_user']['_id'] ||
            auth_user['_id'] === res['followed_user']['_id']
        ) {
            this.props.getSuggestions();
        }
    }

    onUnfollowUserSocketEventHandler = (res) => {
        let auth_user = this.props.auth.user;
        if (
            auth_user['_id'] === res['current_user']['_id'] ||
            auth_user['_id'] === res['unfollowed_user']['_id']
        ) {
            this.props.getSuggestions();
        }
    }

    postMenuClickedHandler(post) {
        this.setState({ openPostMenuModal: true, openCommentModal: false });
        setTimeout(() => {
            this.modalRef.current.showModal(post, this.props.auth.user._id)
        }, 100);
    }

    commentMenuClickedHandler(post) {
        this.setState({ openPostMenuModal: false, openCommentModal: true });
        setTimeout(() => this.modalRef.current.showModal(post, this.props.auth.user._id), 100);
    }

    deletePost(post_id) {
        this.props.deletePost(post_id);
    }

    likeThePost(post_id) {
        this.props.likePost(post_id);
    }

    unLikeThePost(post_id) {
        this.props.unLikePost(post_id);
    }

    commentThePost(post_id, comment) {
        this.props.createComment(comment, post_id);
    }

    followTheUser(user_id) {
        this.props.followUser(user_id);
    }

    render() {
        return (
            <div className="container mt-3 pt-5" id="news_feed">
                <div className="row">

                    {/* LEFT SIDE POSTS */}
                    <div className="col-lg-7 p-0" id="posts_column">
                        <Posts
                            current_user={this.props.auth.user}
                            posts={this.state.postsProps}
                            postMenuClickedHandler={(post) => this.postMenuClickedHandler(post)}
                            commentMenuClickedHandler={(post) => this.commentMenuClickedHandler(post)}
                            likePostHandler={(post_id) => this.likeThePost(post_id)}
                            unLikePostHandler={(post_id) => this.unLikeThePost(post_id)}
                            commentPostHandler={(post_id, comment) => this.commentThePost(post_id, comment)}
                            ref={this.postsComponent}
                        />
                    </div>

                    {/* RIGHT SIDE SUGGESTIONS */}
                    <div className="col d-none d-lg-block p-5" id="profile_column">
                        <Suggestions suggestions={this.props.suggestions} current_user={this.props.auth.user} />
                    </div>
                </div>

                {/* BOTTOM SIDE SUGGESTION BOXES */}
                <div id="suggestion_row" className="row bg-white mb-5 py-4 border">
                    <SuggestionBoxes suggestions={this.props.suggestions} onfollowUser={(user_id) => this.followTheUser(user_id)} />
                </div>

                <Modal
                    modalRef={this.modalRef}
                    showPostMenuModal={this.state.openPostMenuModal}
                    showCommentModal={this.state.openCommentModal}
                    onDeletePostHandler={(post_id) => this.deletePost(post_id)}
                />
            </div>
        )
    }
}

const PostMenuModel = ({ postModalRef, onDeletePostHandler }) => {
    return (
        <PostMenuModal
            ref={postModalRef}
            deletePostHandler={(post_id) => onDeletePostHandler(post_id)}
        />
    )
}

const CommentsModal = ({ commentModalRef }) => {
    return (
        <CommentModal ref={commentModalRef} />
    )
}

const Modal = ({ modalRef, showPostMenuModal, showCommentModal, onDeletePostHandler }) => {
    if (showPostMenuModal) {
        return (
            <PostMenuModel postModalRef={modalRef} onDeletePostHandler={(post_id) => onDeletePostHandler(post_id)} />
        )
    }

    if (showCommentModal) {
        return (
            <CommentsModal commentModalRef={modalRef} />
        )
    }
    return null;
}

NewsFeed.propTypes = {
    posts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unLikePost: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
    getSuggestions: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth,
    suggestions: state.users.suggestions,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {
        getPosts,
        deletePost,
        likePost,
        unLikePost,
        createComment,
        getSuggestions,
        followUser,
        unfollowUser
    }
)(withRouter(NewsFeed));
