import React, { Component } from 'react'

import Modal from "./Modal";

export default class PostMenuModal extends Component {
    constructor(props) {
        super(props);
        this.modalComponent = React.createRef();

        this.post = {};
        this.current_user_id = "";
        this.is_current_user_post = true;
    }

    showModal(post, user_id) { 
        this.post = post;
        this.current_user_id = user_id;
        this.modalComponent.current.showModal();
        // this.is_current_user_post = this.current_user_id === this.post.user;
    }

    render() {
        return (
            <Modal ref={this.modalComponent} >
                <div className="modal-body text-center p-lg p-0" id="menu_btns">
                    HELLO
                </div>
            </Modal>
        )
    }
}
