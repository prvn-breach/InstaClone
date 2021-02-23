import React, { Component } from 'react'

import "./Conversation.css"

class Conversation extends Component {
    render() {
        return (
            <div id="conversation" className="d-flex" onClick={() => this.props.onClickUser(this.props.id)}>
                <img
                    src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
                    className="rounded-circle mr-3"
                    width="60"
                    height="60"
                    alt=""
                />
                {this.props.is_active && <div id="online_dot" />}
                <span id="conversation_user" className="d-flex flex-column">
                    <label className="font-weight-bold mb-0">{this.props.username}</label>
                    {this.props.is_active && <label className="text-muted" style={{ fontSize: '11px' }}>Active Now</label>}
                </span>
            </div>
        )
    }
}

export default Conversation;
