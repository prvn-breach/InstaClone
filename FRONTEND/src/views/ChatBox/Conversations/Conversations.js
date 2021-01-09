import React, { Component } from 'react'

import Conversation from "./Conversation/Conversation";

class Conversations extends Component {
    render() {
        let conversations_list = [
            { id: 1, username: "prvn_king", is_active: true },
            { id: 2, username: "elon_musk", is_active: false },
            { id: 3, username: "sundar_pichai", is_active: false },
            { id: 4, username: "mark_zuckerberg", is_active: true },
            { id: 5, username: "billgates", is_active: false }
        ];
        
        let conversations = conversations_list.map((conversation, i) => <Conversation key={i} {...conversation} />);
        return (
            <div id="conversations">
                {conversations}
            </div>
        )
    }

}

export default Conversations;
