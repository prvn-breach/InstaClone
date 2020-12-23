import React, { Component } from 'react'

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
    render() {
        return (
            <div className="mb-5">
                <div className="card">

                    {/* HEADER */}
                    <div className="card-header border-bottom-0 p-3 mb-0">
                        <img
                            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                            alt=""
                            className="rounded-circle border"
                            id="user_image"
                        />
                        <a href="#" className="ml-3 text-dark">praveen_kumar</a>

                        <IconButton color="default" component="span" className="float-right p-0">
                            <MoreVertIcon />
                        </IconButton>
                    </div>

                    {/* POST */}
                    <div className="card-body m-0 p-0">
                        {/* <span className="card-text p-2">This is for testing</span> */}
                        <img
                            className="card-img"
                            src="https://www.holidify.com/images/bgImages/ARAKU-VALLEY.jpg"
                            alt=""
                        />

                        {/* ICONS */}
                        <div className="d-flex p-3" id="postIcons">
                            <IconButton color="default" component="span" className="p-0">
                                <FavoriteBorderIcon />
                            </IconButton>

                            <IconButton color="default" component="span" className="p-0">
                                <ChatBubbleOutlineIcon />
                            </IconButton>

                            <IconButton color="default" component="span" className="ml-auto p-0">
                                <BookmarkBorderIcon />
                            </IconButton>
                        </div>
                    </div>

                    {/* LIKES */}
                    <div className="card-text pl-3" style={{fontWeight: 500, fontSize: '15px' }}>34 likes</div>

                    {/* COMMENTS */}
                    <div id="comments">
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>

                    {/* ADD COMMENTS */}
                    <div className="card-footer p-0 bg-white d-flex" style={{height: '58px'}} id="comment_box">
                        <input className="form-control border-0" placeholder="Add Comment" />
                        <IconButton color="default" component="span" className="float-right p-0 mr-1">
                                <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    }
}
