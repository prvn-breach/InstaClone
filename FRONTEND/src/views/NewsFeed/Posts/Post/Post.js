import React, { Component } from 'react'
import { setFileUrl } from "../../../../helpers";

import Comment from "./Comment/Comment";

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import "./Post.css";

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }

    render() {
        const { _id, name, image, is_post_liked_by_current_user, likes, comments } = this.props;
        const imageLink = setFileUrl(image);

        let size = 4;
        const comments_list = comments.slice(0, size).map((comment, i) => <Comment key={i} {...comment} />);
        return (
            <div className="mb-4">
                <div className="card">

                    {/* HEADER */}
                    <div className="card-header border-bottom-0 p-3 mb-0 bg-white">
                        <img
                            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                            alt=""
                            className="rounded-circle border"
                            id="user_image"
                        />
                        <a href="#" className="ml-3 text-dark">{name}</a>

                        <IconButton onClick={() => this.props.onPostMenuClicked()} color="default" component="span" className="float-right p-0">
                            <MoreVertIcon />
                        </IconButton>
                    </div>

                    {/* POST */}
                    <div className="card-body m-0 p-0">
                        {/* <span className="card-text p-2">This is for testing</span> */}
                        <img
                            className="card-img"
                            src={imageLink}
                            alt=""
                        />

                        {/* ICONS */}
                        <div className="d-flex p-3" id="postIcons">
                            {is_post_liked_by_current_user ? (
                                <IconButton style={{color: "red"}} component="span" className="p-0" onClick={() => this.props.onUnLikePostClicked(_id)}>
                                    <FavoriteIcon />
                                </IconButton>
                            ) : (
                                <IconButton color="default" component="span" className="p-0" onClick={() => this.props.onLikePostClicked(_id)}>
                                    <FavoriteBorderIcon />
                                </IconButton>
                            )}

                            <IconButton color="default" component="span" className="p-0" onClick={() => this.props.onCommentMenuClicked()}>
                                <ChatBubbleOutlineIcon />
                            </IconButton>

                            <IconButton color="default" component="span" className="ml-auto p-0">
                                <BookmarkBorderIcon />
                            </IconButton>
                        </div>
                    </div>

                    {/* LIKES */}
                    <div className="card-text pl-3" style={{ fontWeight: 500, fontSize: '15px' }}>{likes.length} likes</div>

                    {/* COMMENTS */}
                    <div id="comments">
                        {comments_list}
                    </div>

                    {/* COMMENT INPUT */}
                    <div className="card-footer p-0 bg-white d-flex" style={{ height: '58px' }} id="comment_box">
                        <input 
                            onChange={(event) => this.setState({ comment: event.target.value })} 
                            value={this.state.comment} 
                            className="form-control border-0" 
                            placeholder="Add Comment" 
                            onKeyPress={event => event.key === 'Enter' ? this.props.onCommentPostClicked(_id, this.state.comment) : null}
                        />
                        <IconButton 
                            onClick={() => {
                                this.props.onCommentPostClicked(_id, this.state.comment);
                                this.setState({ comment: '' });
                            }} 
                            disabled={!this.state.comment.trim()} 
                            color="default" 
                            component="span" 
                            className="float-right p-0 mr-1"
                        > 
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    }
}
