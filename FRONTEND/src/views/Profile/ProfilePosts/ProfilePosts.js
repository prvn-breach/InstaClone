import React, { Component } from 'react'

export default class ProfilePosts extends Component {
    render() {
        return (
            <div className="row mx-1 bg-white" id="profile_posts_row">
                <div className="col-sm-5 p-0 m-0" id="profile_posts_col_1">
                    <img
                        src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg"
                        className="p-0 m-0 w-100 h-100"
                        alt=""
                    />
                </div>
                <div className="col-sm-7 p-5 m-0 my-auto" id="profile_posts_col_2">
                    <div className="text-center">
                        <span className="font-weight-bold h5 d-block">
                            Start capturing and sharing your sweetest moments.
                        </span>
                        <span className="d-block" style={{fontSize: '14px'}}>Get the app to share your first photo or video.</span>
                    </div>
                </div>
            </div>
        )
    }
}
