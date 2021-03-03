import React, { Component } from 'react'

import Comment from "../../NewsFeed/Posts/Post/Comment/Comment";

import "./CommentModal.css";

export default class CommentMenuModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            is_current_user_post: true,
            comments: []
        }
        this.modalBtnClick = React.createRef();
        this.modalClose = React.createRef();
    }

    showModal(post, user_id) {
        this.setState({ post: post, is_current_user_post: user_id === post.user, comments: post.comments });
        this.modalBtnClick.current.click();
    }

    closeModal() { this.modalClose.current.click(); }

    render() {
        const comments_list = this.state.comments.map((comment, i) => <Comment key={i} {...comment} />);
        return (
            <React.Fragment>
                <button className="d-none" data-toggle="modal" ref={this.modalBtnClick} data-target=".animate"></button>

                <div className="modal animate" id="comments-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="true">
                    <div className="modal-dialog a-bounce" role="document">
                        <div className="modal-content p-0 m-0">
                            <div className="modal-header font-weight-bold">COMMENTS</div>
                            <div className="modal-body p-lg p-0" id="comments-modal-body">
                                {comments_list}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
