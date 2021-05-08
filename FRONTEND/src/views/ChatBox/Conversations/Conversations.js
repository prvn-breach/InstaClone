import React, { Component } from 'react'

import Conversation from "./Conversation/Conversation";

class Conversations extends Component {
    render() {
        let conversations = this.props.conversations.map((conversation, i) =>
            <Conversation
                key={i} onClickUser={(id) => this.props.getCurrentUser(id)}
                {...conversation}
                online={
                    this.props.users_statuses.find(user => user.user_id === conversation.receiver_id)
                        ? true : false
                }
            />
        );
        return (
            <div id="conversations">
                {conversations}
            </div>
        )
    }

}

export default Conversations;
