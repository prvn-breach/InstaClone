import React, { Component } from 'react'

import Post from "./Post/Post";
import Stories from "../Stories/Stories";

import "./Posts.css"

export default class Posts extends Component {
    render() {
        console.log(this.props.posts);
        return (
            <div>

                {/* STORIES */}
                <Stories />
                

                {/* POSTS */}
                <Post />
                <Post />
            </div>
        )
    }
}
