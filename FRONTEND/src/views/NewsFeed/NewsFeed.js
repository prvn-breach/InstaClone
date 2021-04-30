import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { socket } from "../../service/socket";

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
        this.postsProps = null;

        this.state = {
            openPostMenuModal: false,
            openCommentModal: false 
        }

        this.postsComponent = React.createRef();
        this.postMenuModal = React.createRef();
        this.commentModal = React.createRef();
    }

    componentDidMount() {
        this.props.getPosts();
        this.props.getSuggestions();
        this.onSocketOpen();
    }

    componentWillUnmount() {
        socket.off("getPosts", this.onGetPostsSocketEventHanlder);
        socket.off("createPost", this.onCreatePostSocketEventHanlder);
        socket.off("updatePost", this.onUpdatePostSocketEventHanlder);
        socket.off("deletePost", this.onDeletePostSocketEventHanlder);
        socket.off("likePost", this.onLikePostSocketEventHanlder);
        socket.off("unlikePost", this.onUnlikePostSocketEventHanlder);
        socket.off("commentPost", this.onCommentPostSocketEventHanlder);
        socket.off('followUser', this.onFollowUserSocketEventHanlder);
        socket.off('unfollowUser', this.onUnfollowUserSocketEventHanlder);
    }

    componentWillReceiveProps() {
        if (this.props.errors['error']) { 
            // let error_message= this.props.errors['message'];
            if (window.confirm("There is something problem in sockets please refresh this page to resolve this issue...")) {
                console.log("PAGE REFRESHED...");
                window.reload(true);
            }
        }
    }

    onSocketOpen() {
        socket.on("getPosts", this.onGetPostsSocketEventHanlder);
        socket.on("createPost", this.onCreatePostSocketEventHanlder);
        socket.on("updatePost", this.onUpdatePostSocketEventHanlder);
        socket.on("deletePost", this.onDeletePostSocketEventHanlder);
        socket.on("likePost", this.onLikePostSocketEventHanlder);
        socket.on("unlikePost", this.onUnlikePostSocketEventHanlder);
        socket.on("commentPost", this.onCommentPostSocketEventHanlder);
        socket.on('followUser', this.onFollowUserSocketEventHanlder);
        socket.on('unfollowUser', this.onUnfollowUserSocketEventHanlder);
    }
    
    onGetPostsSocketEventHanlder = () => {
        this.postsComponent.current.forceUpdate();
    }

    onCreatePostSocketEventHanlder = (post) => {
        let auth_user = this.props.auth.user;
        // console.log("This Post Belongs To Current User: " + (post['user'] === auth_user['_id']));
        // console.log("This Post Belongs To Current User Followers: " + auth_user['followers'].includes(post['user']));
        // console.log("This Post Belongs To Current User Follwing: " + auth_user['following'].includes(post['user']));
        if (
            post['user'] === auth_user['_id'] ||
            auth_user['followers'].includes(post['user']) ||
            auth_user['following'].includes(post['user'])
        ) {
            this.postsProps.posts.unshift(post);
            this.postsComponent.current.forceUpdate();
        }
    }

    onDeletePostSocketEventHanlder = () => {
        this.props.getPosts();
        this.postMenuModal.current.closeModal();
    }

    onUpdatePostSocketEventHanlder = (post) => {
        this.updatePost(post);
    }
    
    onLikePostSocketEventHanlder = (post) => {
        this.updatePost(post);
    }

    onUnlikePostSocketEventHanlder = (post) => {
        this.updatePost(post);
    }

    onCommentPostSocketEventHanlder = (post) => {
        this.updatePost(post);
    }

    onFollowUserSocketEventHanlder = (res) => {
        let auth_user = this.props.auth.user;
        if (
            auth_user['_id'] === res['current_user']['_id'] || 
            auth_user['_id'] === res['followed_user']['_id']
        ) {
            this.props.getSuggestions();
        }
    }

    onUnfollowUserSocketEventHanlder = (res) => {
        let auth_user = this.props.auth.user;
        if (
            auth_user['_id'] === res['current_user']['_id'] || 
            auth_user['_id'] === res['unfollowed_user']['_id']
        ) {
            this.props.getSuggestions();
        }
    }

    updatePost(updatedPost) {
        const index = this.postsProps.posts.findIndex(post => post._id === updatedPost._id);
        this.postsProps.posts[index] = updatedPost;
        this.postsComponent.current.forceUpdate();
    }

    postMenuClickedHandler(post) {
        this.setState({ openPostMenuModal: true, openCommentModal: false });
        setTimeout(() => this.postMenuModal.current.showModal(post, this.props.auth.user._id), 100);
    }

    commentMenuClickedHandler(post) {
        this.setState({ openPostMenuModal: false, openCommentModal: true });
        setTimeout(() => this.commentModal.current.showModal(post, this.props.auth.user._id), 100);
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
        this.postsProps = this.props.posts;
        return (
            <div className="container mt-3 pt-5" id="news_feed">
                <div className="row">

                    {/* LEFT SIDE POSTS */}
                    <div className="col-lg-7 p-0" id="posts_column">
                        <Posts
                            current_user={this.props.auth.user}
                            posts={this.postsProps.posts}
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
                        <Suggestions suggestions={this.props.suggestions} />
                    </div>
                </div>

                {/* BOTTOM SIDE SUGGESTION BOXES */}
                <div id="suggestion_row" className="row bg-white mb-5 py-4 border">
                    <SuggestionBoxes suggestions={this.props.suggestions} onfollowUser={(user_id) => this.followTheUser(user_id)} />
                </div>


                {/* POST MENU MODAL */}
                {this.state.openPostMenuModal && 
                    <PostMenuModal 
                        ref={this.postMenuModal} 
                        deletePostHandler={(post_id) => this.deletePost(post_id)} 
                    />
                }

                {/* COMMENT MODAL */}
                {this.state.openCommentModal && 
                    <CommentModal ref={this.commentModal} />
                }
            </div>
        )
    }
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
