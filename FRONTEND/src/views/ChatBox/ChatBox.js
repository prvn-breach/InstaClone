import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getUserConversation, sentMessage } from "../../actions/chatActions";

import Conversations from "./Conversations/Conversations";
import Messages from "./Messages/Messages";
import Details from "./Details/Details";
import EmojiPicker from "./EmojiPicker/EmojiPicker";

import "./ChatBox.css";

class ChatBox extends Component {

    constructor() {
        super();
        this.state = {
            text: "",
            details_clicked: false,
            sticker_clicked: false,
            show_conversations: false,
            current_user: { id: 1, username: "prvn_king", is_active: true, messages: [{ id: 1, text: "Hi Praveen", user_id: "5f6abb9a7625083282a9c4ddd", time: "Sunday 7:02pm", is_time_showing: true }] },
            conversation: { conversation_users: [] }
        };
        this.onChange = this.onChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.chats.loading) {
            this.setState({ conversation: nextProps.chats.conversation });
        }
    }

    componentDidMount() {
        this.props.getUserConversation();
        this.showColumn();
        this.responseWindowResize();
        window.addEventListener('resize', this.responseWindowResize)
    }

    componentWillUnmount() {
        this.displayNavbars();
        window.removeEventListener("resize", this.responseWindowResize);
    }

    displayNavbars() {
        let navbars = document.getElementsByTagName("nav");
        for (let i = 0; i < navbars.length; i++) {
            navbars[i].classList.remove("d-none");
        }
    }

    responseWindowResize = () => {
        this.showColumn();
        this.controlNavbars();
    }

    controlNavbars() {
        let navbars = document.getElementsByTagName("nav");
        if (document.getElementById("chatbox")) {
            if (window.innerWidth > 569) {
                this.displayNavbars();
                return;
            }
            for (let i = 0; i < navbars.length; i++) {
                navbars[i].classList.add("d-none");
            }
        }
    }

    showColumn() {
        let row1_col1 = document.querySelector("#chatbox_row1 > #chatbox_col1");
        let row2_col1 = document.querySelector("#chatbox_row2 > #chatbox_col1");
        let row1_col2 = document.querySelector("#chatbox_row1 > #chatbox_col2");
        let row2_col2 = document.querySelector("#chatbox_row2 > #chatbox_col2");

        if (window.innerWidth > 767) {
            row1_col1.style.display = "block";
            row2_col1.style.display = "block";
            row1_col2.style.display = "block";
            row2_col2.style.display = "block";
            return;
        }

        if (this.state.show_conversations) {
            row1_col1.style.display = "block";
            row2_col1.style.display = "block";
            row1_col2.style.display = "none";
            row2_col2.style.display = "none";
        } else {
            row1_col1.style.display = "none";
            row2_col1.style.display = "none";
            row1_col2.style.display = "block";
            row2_col2.style.display = "block";
        }
    }

    controlColumns = (value) => {
        this.setState({ show_conversations: true });
        this.showColumn();
    }

    getCurrentUserMessages(id) {
        let current_user = this.state.conversation.conversation_users.find(conversation => conversation.receiver_id === id);
        current_user['messages'] = this.state.conversation.messages.filter(message => message.receiver_id === id);
        this.setState({ current_user });
    }

    onChange(e) {
        this.setState({ text: e.target.value });
    }

    sendMessage(message, receiver_id) {
        this.props.sentMessage({ user_id: receiver_id, message: message});
    }

    imagePicked = (event, emojiObj) => {
        event.persist();
        this.setState({ text: this.state.text + emojiObj.emoji });
    }

    render() {
        const { username } = this.props.auth.user;
        return (
            <div>
                <div id="chatbox" className="mt-5 pt-4 container">
                    {/* INBOX HEADERS */}
                    <div className="row bg-white border border-bottom-0 mx-5" id="chatbox_row1">
                        <div className="col-md-4 border-right p-0" id="chatbox_col1">
                            <div id="options">
                                <span></span>

                                <span id="choose_accounts" className="d-flex align-items-center">
                                    <span className="font-weight-bold mr-2">{username}</span>
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

                                {/* GO BACK ICON */}
                                {!this.state.details_clicked && <span id="back_to_conversations" onClick={() => this.controlColumns(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                                    </svg>
                                </span>}

                                {!this.state.details_clicked
                                    ? (<div id="username" className="d-flex align-items-center">
                                        <img
                                            src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
                                            className="rounded-circle mr-2"
                                            width="30"
                                            height="30"
                                            alt=""
                                        />

                                        <div id="online_dot"></div>

                                        <span className="d-flex flex-column mt-2">
                                            <label className="font-weight-bold mb-0">{this.state.current_user.receiver_name}</label>
                                            <label className="text-muted" style={{ fontSize: '11px' }}>{
                                                this.state.current_user.is_active ? "Active Now" : "Active 23h ago"
                                            }</label>
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

                    <div className="row bg-white border border-top-0 mx-5" id="chatbox_row2">
                        {/* CONVERSATIONS */}
                        <div className="col-md-4 border-right p-0 h-100" id="chatbox_col1" style={{ overflowY: "scroll" }}>
                            <div id="conversations_block">
                                <Conversations
                                    conversations={this.state.conversation.conversation_users}
                                    getCurrentUser={(id) => this.getCurrentUserMessages(id)}
                                />
                            </div>
                        </div>

                        {!this.state.details_clicked && <div className="col-md-8 p-3 h-100" id="chatbox_col2">

                            {/* MESSAGES */}
                            <div id="messages" onClick={() => this.setState({ sticker_clicked: false })}>
                                <Messages 
                                    messages={this.state.current_user.messages} 
                                    text={this.state.text}
                                />
                            </div>

                            {/* EmojiPicker */}
                            {this.state.sticker_clicked && <div id="emoji_picker">
                                <EmojiPicker pickImage={() => this.imagePicked} />
                            </div>}

                            {/* MESSAGE INPUT */}
                            <div id="message_box">
                                <span onClick={() => this.setState({ sticker_clicked: !this.state.sticker_clicked })}>
                                    {!this.state.sticker_clicked ? (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-sticky" viewBox="0 0 16 16">
                                        <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z" />
                                    </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-sticky-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V9.5z" />
                                    </svg>)}
                                </span>

                                <textarea
                                    className="form-control"
                                    placeholder="Message..."
                                    onChange={this.onChange}
                                    value={this.state.message}
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

                                {this.state.text && <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => this.sendMessage(this.state.text, this.state.current_user.receiver_id)}>Send</span>}
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

ChatBox.propTypes = {
    auth: PropTypes.object.isRequired,
    chats: PropTypes.object.isRequired,
    getUserConversation: PropTypes.func.isRequired,
    sentMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    chats: state.chats
});

export default connect(mapStateToProps, { getUserConversation, sentMessage })(withRouter(ChatBox));
