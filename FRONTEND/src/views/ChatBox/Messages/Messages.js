import React, { Component } from 'react'

import "./Messages.css";

import Message from "./Message/Message"

export default class Messages extends Component {
    render() {        
        let messages = this.props.current_user.messages.map((message, i) => <Message key={i} {...message} />);
        
        let typing;
        if (this.props.current_user['typing']) {
            typing = <span>Typing...</span>;
        }
        return (
            <React.Fragment>
                {messages}
                {typing}
            </React.Fragment>
        )
    }
}
