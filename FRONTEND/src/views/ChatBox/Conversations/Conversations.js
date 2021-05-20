import React, { Component } from 'react'

import Conversation from "./Conversation/Conversation";
import ConversationLoadingWave from "./ConversationLoadingWave/ConversationLoadingWave";

class Conversations extends Component {
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
                online={this.props.userActive(conversation.receiver_id)}
                getLastSeen={(user_id) => this.props.getLastSeen(user_id)}
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
