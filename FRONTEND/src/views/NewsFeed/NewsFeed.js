import React, { Component } from 'react'

import Posts from "./Posts/Posts";
import Suggestions from "./Suggestions/Suggestions";

import "./NewsFeed.css";

export default class NewsFeed extends Component {
    render() {
        return (
            <div className="container mt-5 pt-5" id="news_feed">
                <div className="row">
                    <div className="col-lg-7 p-0 mb-3" id="story_column">
                        <div className="card" style={{height: '120px'}}>
                            {/* <div class="d-flex justify-content-start">
                                <div className="flex-row">
                                    
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-lg-7 p-0" id="posts_column">
                        <Posts />
                    </div>
                    <div className="col d-none d-lg-block p-5"  id="profile_column">
                        <Suggestions />
                    </div>
                </div>
            </div>
        )
    }
}
