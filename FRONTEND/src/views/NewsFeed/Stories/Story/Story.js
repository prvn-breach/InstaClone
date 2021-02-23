import React, { Component } from 'react'

import "./Story.css";

export default class Story extends Component {
    render() {
        const { username } = this.props;
        return (
            <div id="story">
                <div className="p-2">
                    <button type="button" className="border-0 bg-light">
                        <img
                            src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
                            className="rounded-circle mb-2"
                            width="56"
                            height="56"
                            alt=""
                        />
                        <span className="d-block" style={{ fontSize: '12px' }}>{username}</span>
                    </button>
                </div>
            </div>
        )
    }
}
