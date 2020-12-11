import React, { Component } from 'react'

import Posts from "./Posts/Posts";
import Suggestions from "./Suggestions/Suggestions";

import "./NewsFeed.css";

export default class NewsFeed extends Component {
    render() {
        return (
            <div className="container mt-5 pt-5" id="news_feed">
                <div className="row">

                    {/* LEFT SIDE POSTS */}
                    <div className="col-lg-7 p-0" id="posts_column">
                        <Posts />
                    </div>

                    {/* RIGHT SIDE SUGGESTIONS */}
                    <div className="col d-none d-lg-block p-5"  id="profile_column">
                        <Suggestions />
                    </div>                
                </div>

                <div id="suggestion_row" className="row bg-white mb-5 py-4 border">
                    <div className="w-100 col-lg-7 mb-2">
                        <span className="text-muted">Suggestions For You</span>
                        <a href="#" className="nav-link p-0 float-right">See All</a>
                    </div>
                    <div id="suggestion_col" className="col-lg-7 ml-0 pl-3">
                        <div className="d-flex justify-content-start" style={{overflowX: "auto"}}>
                            <div className="border rounded p-3 mr-2" style={{height:"185px"}}>
                                <div className="pl-4 pr-4">
                                    <img 
                                        src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2" 
                                        height="50"
                                        width="50"
                                        className="rounded-circle"
                                    />
                                </div>
                            </div>

                            <div className="border rounded p-3 mr-2" style={{height:"185px"}}>
                                <div className="pl-4 pr-4">
                                    <img 
                                        src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2" 
                                        height="50"
                                        width="50"
                                        className="rounded-circle"
                                    />
                                </div>
                            </div>

                            <div className="border rounded p-3 mr-2" style={{height:"185px"}}>
                                <div className="pl-4 pr-4">
                                    <img 
                                        src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2" 
                                        height="50"
                                        width="50"
                                        className="rounded-circle"
                                    />
                                </div>
                            </div>

                            <div className="border rounded p-3 mr-2" style={{height:"185px"}}>
                                <div className="pl-4 pr-4">
                                    <img 
                                        src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2" 
                                        height="50"
                                        width="50"
                                        className="rounded-circle"
                                    />
                                </div>
                            </div>

                            <div className="border rounded p-3 mr-2" style={{height:"185px"}}>
                                <div className="pl-4 pr-4">
                                    <img 
                                        src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2" 
                                        height="50"
                                        width="50"
                                        className="rounded-circle"
                                    />
                                </div>
                            </div>

                            <div className="border rounded p-3 mr-2" style={{height:"185px"}}>
                                <div className="pl-4 pr-4">
                                    <img 
                                        src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2" 
                                        height="50"
                                        width="50"
                                        className="rounded-circle"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
