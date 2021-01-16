import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import openSocket from "socket.io-client";


import { getPosts } from "../../actions/postActions";

import Posts from "./Posts/Posts";
import Suggestions from "./Suggestions/Suggestions";
import SuggestionBoxes from "./SuggestionBoxes/SuggestionBoxes";


import "./NewsFeed.css";

class NewsFeed extends Component {

    constructor() {
        super();
        this.postsProps = null;

        this.getPosts = openSocket("http://localhost:5000/posts/get");
        this.createdPost = openSocket("http://localhost:5000/posts/create");
        this.updatedPost = openSocket("http://localhost:5000/posts/update");
        this.deletedPost = openSocket("http://localhost:5000/posts/delete");
        this.likePost = openSocket("http://localhost:5000/posts/like");
        this.unlikePost = openSocket("http://localhost:5000/posts/unlike");
        this.commentPost = openSocket("http://localhost:5000/posts/comment");

        this.postsComponent = React.createRef();
    }


    componentDidMount() {
        this.props.getPosts();
        this.onSocketOpen();
    }

    onSocketOpen() {
        this.getPosts.on("getPosts", () => this.postsComponent.current.forceUpdate());

        this.createdPost.on("createPost", post => {
            this.postsProps.posts.unshift(post);
            this.postsComponent.current.forceUpdate();
        });

        this.updatedPost.on("updatePost", post => this.updatePost(post));

        this.deletedPost.on("deletePost", () => this.props.getPosts());

        this.likePost.on("likePost", post => this.updatePost(post));

        this.unlikePost.on("unlikePost", post => this.updatePost(post));

        this.commentPost.on("commentPost", post => this.updatePost(post));
    }

    updatePost(updatedPost) {
        const index = this.postsProps.posts.findIndex(post => post.id == updatedPost.id);
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
    }

    render() {
        this.postsProps = this.props.posts;
        return (
            <div className="container mt-3 pt-5" id="news_feed">
                <div className="row">

                    {/* LEFT SIDE POSTS */}
                    <div className="col-lg-7 p-0" id="posts_column">
                        <Posts posts={this.postsProps.posts} ref={this.postsComponent} />
                    </div>

                    {/* RIGHT SIDE SUGGESTIONS */}
                    <div className="col d-none d-lg-block p-5" id="profile_column">
                        <Suggestions />
                    </div>
                </div>

                {/* BOTTOM SIDE SUGGESTION BOXES */}
                <div id="suggestion_row" className="row bg-white mb-5 py-4 border">
                    <SuggestionBoxes />
                </div>
            </div>
        )
    }
}

NewsFeed.propTypes = {
    posts: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(withRouter(NewsFeed));
