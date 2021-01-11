import React, { Component } from 'react'

import Post from "./Post/Post";
import Stories from "../Stories/Stories";

import "./Posts.css"

export default class Posts extends Component {
    render() {
        let posts = this.props.posts.map((post, i) => <Post key={i} {...post} />);
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
