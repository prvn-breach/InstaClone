import React, { Component } from 'react'

import Post from "./Post/Post";
import Stories from "../Stories/Stories";

import "./Posts.css"

export default class Posts extends Component {

    constructor() {
        super();
        this.posts = [];
    }

    postMenuClick(post) {
        this.props.postMenuClickedHandler(post);
    }

    render() {
        this.posts = this.props.posts;
        let posts = this.posts.map((post, i) => <Post key={i} onPostMenuClicked={() => this.postMenuClick(post)} {...post} />);
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
