import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProfileTabs from "./ProfileTabs/ProfileTabs";
import ImageUpload from "../../hooks/ImageUpload";
import Spinner from "../Helpers/Spinner";

import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import PersonIcon from '@material-ui/icons/Person';
import DoneIcon from '@material-ui/icons/Done';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


// Actions
import { getUsersByFilter } from "../../actions/userActions";

import "./Profile.css";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sub_page: "posts"
        }
    }
    
    componentDidMount() {
        this.props.getUsersByFilter({ username: this.props.match.params.username });
    }

    render() {
        if (this.props.users.loading) {
            return (
                <div className="h-100" style={{ padding: '20%' }}>
                    <Spinner />
                </div>
            );
        }
        const { name, username, followers, following } = this.props.users.user;
        return (
            <div className="container" id="profile_page">
                <div className="mt-3 pt-3" id="profile">
                    <div className="row m-0 p-5" id="profile_row_1">
                        <div className="col-4" id="profile_column_1">
                            <ImageUpload
                                height="160"
                                title="Add a profile photo"
                                className="rounded-circle ml-2 border border-light"
                            />
                        </div>
                        <div className="col-8" id="profile_column_2">
                            <div className="d-flex" id="profile_flex_1">
                                <div className="p-2 display-4" id="name">{name}</div>
                                <div className="pt-3" id="edit_icon">
                                    <Link to="/accounts/edit">
                                        <IconButton component="span"><EditOutlinedIcon /></IconButton>
                                    </Link>
                                    {/* <button className="btn border border-secondary" id="edit_btn">Edit Profile</button> */}
                                </div>
                                <div className="m-0" id="additional_options">
                                    <div className="d-flex">
                                        <button
                                            className="btn border mr-2"
                                            size="sm"
                                            style={{ backgroundColor: 'rgba(var(--b3f,250,250,250),1)' }}
                                            id="message"
                                        >Message</button>
                                        <button
                                            className="border mr-2 rounded"
                                            style={{ backgroundColor: 'rgba(var(--b3f,250,250,250),1)' }}
                                            id="follow_icon"
                                        >
                                            <PersonIcon />
                                            <DoneIcon />
                                        </button>
                                        <button
                                            className="border rounded"
                                            style={{ backgroundColor: 'rgba(var(--b3f,250,250,250),1)' }}
                                            id="arrow_down_icon"
                                        >
                                            <ArrowDropDownIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex ml-1" id="profile_flex_2">
                                <div className="p-2"><span className="font-weight-bold mr-1">0</span>posts</div>
                                <div className="p-2"><span className="font-weight-bold mr-1">{followers ? followers.length : 0}</span>followers</div>
                                <div className="p-2"><span className="font-weight-bold mr-1">{following ? following.length : 0}</span>following</div>
                            </div>
                            <div className="d-flex ml-1 d-none d-lg-block" id="profile_flex_3">
                                <div className="p-2">{username}</div>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE ROW */}
                    <div className="row pt-2 border-top border-bottom" id="profile_row_2">
                        <ul className="list-inline w-100 d-flex justify-content-between align-items-center" style={{ fontSize: '14px' }}>
                            <li className="list-inline-item text-center ml-5">
                                <span className="font-weight-bold d-block">0</span>
                                <span className="text-muted">Posts</span>
                            </li>
                            <li className="list-inline-item text-center">
                                <span className="font-weight-bold d-block">{followers ? followers.length : 0}</span>
                                <span className="text-muted">Followers</span>
                            </li>
                            <li className="list-inline-item text-center mr-5">
                                <span className="font-weight-bold d-block">{following ? following.length : 0}</span>
                                <span className="text-muted">Following</span>
                            </li>
                        </ul>
                    </div>

                    {/* TABS */}

                    <div className="row border-top justify-content-center align-items-center" id="profile_row_3">
                        <ul className="list-inline mt-3" style={{ fontSize: '14px', fontWeight: '450', letterSpacing: '2px' }}>
                            <li className="list-inline-item mx-5" onClick={() => this.setState({ sub_page: "posts" })}>
                                <IconButton component="span" color={this.state.sub_page === 'posts' ? "primary" : "default"}>
                                    <ViewModuleOutlinedIcon />
                                </IconButton>
                                <span className={"tab " +
                                    (this.state.sub_page === 'posts'
                                        ? "font-weight-bold"
                                        : "text-muted")
                                }>POSTS</span>
                            </li>
                            <li className="list-inline-item mx-5" onClick={() => this.setState({ sub_page: "saved" })}>
                                <IconButton component="span" color={this.state.sub_page === 'saved' ? "primary" : "default"}>
                                    <BookmarkBorderOutlinedIcon />
                                </IconButton>
                                <span className={"tab " +
                                    (this.state.sub_page === 'saved'
                                        ? "font-weight-bold"
                                        : "text-muted")
                                }>SAVED</span>
                            </li>
                            <li className="list-inline-item mx-5" onClick={() => this.setState({ sub_page: "tagged" })}>
                                <IconButton component="span" color={this.state.sub_page === 'tagged' ? "primary" : "default"}>
                                    <LocalOfferOutlinedIcon />
                                </IconButton>
                                <span className={"tab " +
                                    (this.state.sub_page === 'tagged'
                                        ? "font-weight-bold"
                                        : "text-muted")
                                }>TAGGED</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mx-5" id="profile_tabs">
                        <ProfileTabs page={this.state.sub_page} />
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    posts: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    auth_user: PropTypes.object.isRequired,
    getUsersByFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts,
    users: state.users,
    auth_user: state.auth.user,
});

export default connect(mapStateToProps, { getUsersByFilter })(withRouter(Profile));
