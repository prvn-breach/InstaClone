import React, { Component } from 'react'

import Post from "./Post/Post";
import PostLoadingWave from "./PostLoadingWave/PostLoadingWave";
import Stories from "../Stories/Stories";

import "./Posts.css"

export default class Posts extends Component {
    postMenuClick(post) {
        this.props.postMenuClickedHandler(post);
    }

    commentMenuClick(post) {
        this.props.commentMenuClickedHandler(post);
    }

    likePostClicked(post_id) {
        this.props.likePostHandler(post_id);
    }

    unLikePostClicked(post_id) {
        this.props.unLikePostHandler(post_id);
    }

    commentPostClicked(post_id, comment) {
        this.props.commentPostHandler(post_id, comment);
    }

    render() {
        if (this.props.posts === null) {
            return null;
        }
        
        if (this.props.posts.getPostsLoading) {
            let post_loading_waves = [];
            for (let i = 0; i < 3; i++) {
                post_loading_waves[i] = <PostLoadingWave key={i} />
            }
            return (
                <div>
                    <Stories />
                    {post_loading_waves}
                </div>
            );
        }

        // add is_post_liked_by_current_user in post array
        if (this.props.posts.posts.length > 0) {
            this.props.posts.posts.forEach(post => {
                post['is_post_liked_by_current_user'] = post['likes'].find(like => ("user" in like) && like.user === this.props.current_user._id) ? true : false;
            });
        }

        // Append data to Post Component
        let posts = this.props.posts.posts.map((post, i) => <Post
            key={i}
            onPostMenuClicked={() => this.postMenuClick(post)}
            onCommentMenuClicked={() => this.commentMenuClick(post)}
            onLikePostClicked={(post_id) => this.likePostClicked(post_id)}
            onUnLikePostClicked={(post_id) => this.unLikePostClicked(post_id)}
            onCommentPostClicked={(post_id, comment) => this.commentPostClicked(post_id, comment)}
            {...post}
        />);

        return (
            <div>
                {/* STORIES */}
                <Stories />

                {/* POSTS */}
                {posts}
            </div>
        )
    }
}
