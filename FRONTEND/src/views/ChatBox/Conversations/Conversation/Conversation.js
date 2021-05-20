import React, { Component } from 'react'

import "./Conversation.css"

class Conversation extends Component {
    render() {
        return (
            <div id="conversation" className="d-flex" onClick={() => this.props.onClickUser(this.props.receiver_id)}>
                <img
                    src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
                    className="rounded-circle mr-3"
                    width="60"
                    height="60"
                    alt=""
                />
                {this.props.online && <div id="online_dot" />}
                <span id="conversation_user" className="d-flex flex-column">
                    <label className="font-weight-bold mb-0">{this.props.receiver_name}</label>
                    <label className="text-muted" style={{ fontSize: '11px' }}>
                        {
                            this.props.online 
                                ? 'Active Now'
                                : this.props.getLastSeen(this.props.receiver_id)
                        }
                    </label>
                </span>
            </div>
        )
    }
}

export default Conversation;
