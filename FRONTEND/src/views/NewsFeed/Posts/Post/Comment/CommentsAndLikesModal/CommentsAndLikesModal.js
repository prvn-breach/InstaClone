import React, { Component } from 'react'

import "./CommentsAndLikesModal.css";

export default class Modal extends Component {

    constructor() {
        super();
        this.modalBtnClick = React.createRef();
        this.modalClose = React.createRef();

        this.post = {};
        this.current_user_id = "";
        this.is_current_user_post = true;
    }

    showModal = () => {
        // this.post = post;
        // this.current_user_id = user_id;
        this.modalBtnClick.current.click();
        // this.is_current_user_post = this.current_user_id === this.post.user;
    }

    closeModal() {
        this.modalClose.current.click();
    }

    render() {
        return (
            <React.Fragment>
                <button className="d-none" data-toggle="modal" ref={this.modalBtnClick} data-target=".animate"></button>

                <div className="modal animate" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="true">
                    <div className="modal-dialog a-bounce" role="document">
                        <div className="modal-content p-0 m-0">
                            <div className="modal-body text-center">
                                HELLO
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
