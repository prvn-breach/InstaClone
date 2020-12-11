import React, { Component } from 'react'

import Post from "./Post/Post";

import "./Posts.css"

export default class Posts extends Component {
    render() {

       
        return (
            <div>
                <Post />
                <Post />
            </div>
        )
    }
}
