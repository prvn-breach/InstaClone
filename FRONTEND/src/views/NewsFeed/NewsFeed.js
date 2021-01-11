import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";


import { getPosts } from "../../actions/postActions";

import Posts from "./Posts/Posts";
import Suggestions from "./Suggestions/Suggestions";
import SuggestionBoxes from "./SuggestionBoxes/SuggestionBoxes";

import "./NewsFeed.css";

const WebSocketURL = 'ws://localhost:3030'

class NewsFeed extends Component {
    ws = new WebSocket(WebSocketURL);

    componentDidMount() {
        this.props.getPosts();
        this.onSocketOpen();
        this.onSocketClose();
        this.onSocketEventPost();
    }

    onSocketOpen() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        }
    }

    onSocketEventPost() {
        this.ws.onmessage = (evt) => {
            console.log(evt);
        }
    }

    onSocketClose() {
        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(WebSocketURL),
            })
        }
    }

    render() {
        return (
            <div className="container mt-3 pt-5" id="news_feed">
                <div className="row">

                    {/* LEFT SIDE POSTS */}
                    <div className="col-lg-7 p-0" id="posts_column">
                        <Posts {...this.props.posts} />
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
