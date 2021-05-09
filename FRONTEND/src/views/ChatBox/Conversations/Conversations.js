import React, { Component } from 'react'

import Conversation from "./Conversation/Conversation";

class Conversations extends Component {

    userActive(receiver_id) {
        let user = this.props.users_statuses.find(user => user.user_id === receiver_id);
        if (user) {
            return user['active'];
        }
        return false;
    }

    render() {
        let conversations = this.props.conversations.map((conversation, i) =>
            <Conversation
                key={i} onClickUser={(id) => this.props.getCurrentUser(id)}
                online={this.userActive(conversation.receiver_id)}
                {...conversation}
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
