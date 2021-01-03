import React from 'react'

import Conversation from "./Conversation/Conversation";

export default function Conversations() {
    let conversions_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let conversations = conversions_list.map((conversation, i) => <Conversation key={i} />);
    return (
        <div id="conversations">
            {conversations}
        </div>
    )
}
