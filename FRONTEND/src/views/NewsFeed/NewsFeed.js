import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import openSocket from "socket.io-client";


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

        this.getPosts = openSocket("http://localhost:5000/posts/get");
        this.createdPost = openSocket("http://localhost:5000/posts/create");
        this.updatedPost = openSocket("http://localhost:5000/posts/update");
        this.deletedPost = openSocket("http://localhost:5000/posts/delete");
        this.likePost = openSocket("http://localhost:5000/posts/like");
        this.unlikePost = openSocket("http://localhost:5000/posts/unlike");
        this.commentPost = openSocket("http://localhost:5000/posts/comment");
        this.followUser = openSocket("http://localhost:5000/user/follow");
        this.unfollowUser = openSocket("http://localhost:5000/user/unfollow");

        this.postsComponent = React.createRef();
        this.postMenuModal = React.createRef();
        this.commentModal = React.createRef();
    }

    componentDidMount() {
        this.props.getPosts();
        this.props.getSuggestions();

        this.connectSockets();
        this.onSocketOpen();
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

    connectSockets() {
        this.getPosts = openSocket("http://localhost:5000/posts/get");
        this.createdPost = openSocket("http://localhost:5000/posts/create");
        this.updatedPost = openSocket("http://localhost:5000/posts/update");
        this.deletedPost = openSocket("http://localhost:5000/posts/delete");
        this.likePost = openSocket("http://localhost:5000/posts/like");
        this.unlikePost = openSocket("http://localhost:5000/posts/unlike");
        this.commentPost = openSocket("http://localhost:5000/posts/comment");
        this.followUser = openSocket("http://localhost:5000/user/follow");
        this.unfollowUser = openSocket("http://localhost:5000/user/unfollow");
    }

    onSocketOpen() {
        this.getPosts.on("getPosts", () => this.postsComponent.current.forceUpdate());

        this.createdPost.on("createPost", post => {
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
        });

        this.updatedPost.on("updatePost", post => this.updatePost(post));

        this.deletedPost.on("deletePost", () => {
            this.props.getPosts();
            this.postMenuModal.current.closeModal();
        });

        this.likePost.on("likePost", post => this.updatePost(post));

        this.unlikePost.on("unlikePost", post => this.updatePost(post));

        this.commentPost.on("commentPost", post => this.updatePost(post));

        this.followUser.on('followUser', res => {
            let auth_user = this.props.auth.user;
            if (
                auth_user['_id'] === res['current_user']['_id'] || 
                auth_user['_id'] === res['followed_user']['_id']
            ) {
                this.props.getSuggestions();
            }
        });

        this.unfollowUser.on('unfollowUser', res => {
            let auth_user = this.props.auth.user;
            if (
                auth_user['_id'] === res['current_user']['_id'] || 
                auth_user['_id'] === res['unfollowed_user']['_id']
            ) {
                this.props.getSuggestions();
            }
        });
    }

    updatePost(updatedPost) {
        const index = this.postsProps.posts.findIndex(post => post.id === updatedPost.id);
        this.postsProps.posts[index] = updatedPost;
        this.postsComponent.current.forceUpdate();
    }

    componentWillUnmount() {
        this.getPosts.disconnect();
        this.createdPost.disconnect();
        this.updatedPost.disconnect();
        this.deletedPost.disconnect();
        this.likePost.disconnect();
        this.unlikePost.disconnect();
        this.commentPost.disconnect();
        this.followUser.disconnect();
        this.unfollowUser.disconnect();
    }

    postMenuClickedHandler(post) {
        this.setState({ openPostMenuModal: true, openCommentModal: false });
        setTimeout(() => this.postMenuModal.current.showModal(post, this.props.auth.user.id), 100);
    }

    commentMenuClickedHandler(post) {
        this.setState({ openPostMenuModal: false, openCommentModal: true });
        setTimeout(() => this.commentModal.current.showModal(post, this.props.auth.user.id), 100);
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
                {this.state.openPostMenuModal && <PostMenuModal ref={this.postMenuModal} deletePostHandler={(post_id) => this.deletePost(post_id)} />}

                {/* COMMENT MODAL */}
                {this.state.openCommentModal && <CommentModal ref={this.commentModal} />}
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
