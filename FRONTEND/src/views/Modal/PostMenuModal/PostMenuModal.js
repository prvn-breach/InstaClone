import React, { Component } from 'react'

import "./PostMenuModal.css";

export default class Modal extends Component {

    constructor(props) {
        super(props);
        this.modalBtnClick = React.createRef();
        this.modalClose = React.createRef();
        this.is_current_user_post = true;
    }

    showModal(post, user_id) { 
        this.post = post;
        this.current_user_id = user_id;
        this.is_current_user_post = this.current_user_id === this.post.user;
        this.modalBtnClick.current.click();
    }

    deletePost(post_id) {
        this.props.deletePostHandler(post_id);
        this.modalClose.current.click();
    }

    closeModal() { this.modalClose.current.click(); }

    render() {
        return (
            <React.Fragment>
                <button className="d-none" data-toggle="modal" ref={this.modalBtnClick} data-target=".animate"></button>

                <div className="modal animate" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="true">
                    <div className="modal-dialog a-bounce" role="document">
                        <div className="modal-content p-0 m-0"> 
                            <div className="modal-body text-center p-lg p-0" id="menu_btns">
                                {!this.is_current_user_post && <button type="button" className="form-control bg-white p-0 m-0 text-danger font-weight-bold">Unfollow</button>}
                                {this.is_current_user_post && <button type="button" onClick={() => this.deletePost(this.post._id)} className="form-control bg-white p-0 m-0 text-danger font-weight-bold">Delete</button>}
                                <button type="button" className="form-control bg-white p-0 m-0">Go to post</button>
                                <button type="button" className="form-control bg-white p-0 m-0">Share to...</button>
                                <button type="button" className="form-control bg-white p-0 m-0">Copy Link</button>
                                <button type="button" data-dismiss="modal" ref={this.modalClose} className="form-control bg-white p-0 m-0">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
