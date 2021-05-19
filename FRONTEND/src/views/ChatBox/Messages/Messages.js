import React, { Component } from 'react'

import "./Messages.css";

import Message from "./Message/Message"

export default class Messages extends Component {
    render() {        
        let messages = this.props.messages.map((message, i) => <Message key={i} {...message} />);
        
        return (
            <React.Fragment>
                {messages}
                <span>Praveen Typing...</span>
            </React.Fragment>
        )
    }
}
