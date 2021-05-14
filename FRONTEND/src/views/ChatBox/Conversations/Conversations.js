import React, { Component } from 'react'

import Conversation from "./Conversation/Conversation";
import ConversationLoadingWave from "./ConversationLoadingWave/ConversationLoadingWave";

class Conversations extends Component {

    userActive(receiver_id) {
        let user = this.props.users_statuses.find(user => user.user_id === receiver_id);
        if (user) {
            return user['active'];
        }
        return false;
    }

    render() {
        let conversations = [];
        if (this.props.loading_conversations) {
            for (let i = 0; i < 7; i++) {
                conversations[i]=<ConversationLoadingWave key={i} />;
            }
            return conversations;
        }
        conversations = this.props.conversations.map((conversation, i) =>
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
