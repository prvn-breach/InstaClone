import React, { Component } from 'react'

import "./Conversation.css"

class Conversation extends Component {
    render() {
        return (
            <div id="conversation" className="d-flex">
                <img
                    src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
                    className="rounded-circle mr-3"
                    width="60"
                    height="60"
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
