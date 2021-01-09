import React, { Component } from 'react'

import Conversations from "./Conversations/Conversations";
import Messages from "./Messages/Messages";
import Details from "./Details/Details";

import "./ChatBox.css";

export default class ChatBox extends Component {

    constructor() {
        super();
        this.state = {
            text: "",
            details_clicked: false
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ text: e.target.value });
    }

    render() {
        return (
            <div>
                <div id="chatbox" className="mt-5 pt-4 container">

                    {/* INBOX HEADERS */}
                    <div className="row bg-white border border-bottom-0 mx-5" id="chatbox_row1">
                        <div className="col-md-4 border-right p-0" id="chatbox_col1">
                            <div id="options">
                                <span></span>

                                <span id="choose_accounts" className="d-flex align-items-center">
                                    <span className="font-weight-bold mr-2">prvndp6</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </span>

                                <span id="new_message">
                                    <svg aria-label="New Message" className="_8-yf5 " fill="#262626" height="25" viewBox="0 0 44 44" width="25">
                                        <path d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"></path>
                                        <path d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"></path>
                                        <path d="M38.2 14.02a1.51 1.51 0 01-1.1-.44l-6.56-6.56a1.5 1.5 0 012.12-2.12l6.6 6.6a1.49 1.49 0 010 2.12 1.51 1.51 0 01-1.06.4z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-8 p-0" id="chatbox_col2">
                            <div id="options">
                                {!this.state.details_clicked
                                    ? (<div id="username" className="d-flex align-items-center">
                                        <img
                                            src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
                                            className="rounded-circle mr-3"
                                            width="30"
                                            height="30"
                                        />
                                        <span className="d-flex flex-column">
                                            <label className="font-weight-bold mb-0">prvn_king</label>
                                            <label className="text-muted" style={{ fontSize: '11px' }}>Active Now</label>
                                        </span>
                                    </div>)
                                    :
                                    (<div id="username" className="d-flex align-items-center"></div>)}

                                {this.state.details_clicked && <span className="d-block font-weight-bold text-center">Details</span>}

                                <span id="details" onClick={() => this.setState({ details_clicked: !this.state.details_clicked })}>
                                    {!this.state.details_clicked && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>}

                                    {this.state.details_clicked && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                    </svg>}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row bg-white border mx-5" id="chatbox_row2">

                        {/* CONVERSATIONS */}
                        <div className="col-md-4 border-right p-0 h-100" id="chatbox_col1" style={{ overflowY: "scroll" }}>
                            <div id="conversations_block">
                                <Conversations />
                            </div>
                        </div>
                        {!this.state.details_clicked && <div className="col-md-8 p-3 h-100" id="chatbox_col2">

                            {/* MESSAGES */}
                            <div id="messages"><Messages /></div>

                            {/* MESSAGE INPUT */}
                            <div id="message_box">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-sticky" viewBox="0 0 16 16">
                                        <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z" />
                                    </svg>
                                </span>

                                <textarea
                                    className="form-control"
                                    placeholder="Message..."
                                    onChange={this.onChange}
                                    value={this.state.text}
                                />

                                {!this.state.text && <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                    </svg>
                                </span>}

                                {!this.state.text && <span className="ml-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                        <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                    </svg>
                                </span>}

                                {this.state.text && <span className="text-primary">Send</span>}
                            </div>
                        </div>}

                        {/* DETAILS */}
                        {this.state.details_clicked && <div className="col-md-8 h-100 mx-0 px-0" id="chatbox_col2"><Details /></div>}
                    </div>
                </div>
            </div>
        )
    }
}
