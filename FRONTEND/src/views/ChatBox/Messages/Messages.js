import React, { Component } from 'react'

import "./Messages.css";

import Message from "./Message/Message"

export default class Messages extends Component {
    render() {

        let messages_list = [
            {
                id: 1,
                text: "Hello Sundar Picchaana",
                user_id: "5f6abb9a7625083282a9c4d2",
                time: "Sunday 7:02pm",
                is_time_showing: true
            },
            {
                id: 2,
                text: "Hello Praveen Kumar",
                img: "https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2",
                user_id: "5f6abb9a7625083282a9c4d3",
                time: "Sunday 7:02pm",
                is_time_showing: false
            },
            {
                id: 3,
                text: "How are you picchana",
                user_id: "5f6abb9a7625083282a9c4d2",
                time: "Sunday 7:02pm",
                is_time_showing: false
            },
            {
                id: 4,
                text: "Iam Working Now. What Are you doing man . You are soo lazy get up we need to go outside.",
                user_id: "5f6abb9a7625083282a9c4d2",
                time: "Sunday 7:02pm",
                is_time_showing: false
            }
        ];

        let messages = messages_list.map(message => <Message key={message.id} {...message} />);

        return (
            <React.Fragment>
                {messages}
            </React.Fragment>
        )
    }
}
