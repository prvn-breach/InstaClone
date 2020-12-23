import React, { Component } from 'react'

import Post from "./Post/Post";

import "./Posts.css"

export default class Posts extends Component {
    render() {
        return (
            <div>
                <div className="mb-5" id="story_column">
                    <div className="card" style={{height: '120px'}}></div>
                </div>
                
                <Post />
            </div>
        )
    }
}
