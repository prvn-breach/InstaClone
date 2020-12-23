import React, { Component } from 'react'

import ProfilePosts from "../ProfilePosts/ProfilePosts";
import SavedPosts from "../SavedPosts/SavedPosts";
import Tagged from "../Tagged/Tagged";

export default class ProfileTabs extends Component {
    render() {
        let sub_page;

        if (this.props.page == "posts") {
            sub_page = <ProfilePosts />;
        }

        if (this.props.page == "saved") {
            sub_page = <SavedPosts />;
        }

        if (this.props.page == "tagged") {
            sub_page = <Tagged />;
        }

        return sub_page;        
    }
}
