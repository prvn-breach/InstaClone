import React, { Component } from 'react'

import "./SuggestionBox.css"

export default class SuggestionBox extends Component {

    constructor() {
        super();
        this.state = {
            followed: false
        }
    }

    render() {
        const { username, _id } = this.props;
        return (
            <div>
                <div className="border rounded p-3 mr-2" style={{ height: "185px" }}>
                    <div className="pl-4 pr-4">
                        <img
                            src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
                            height="50"
                            width="50"
                            className="rounded-circle"
                            alt=""
                        />
                    </div>
                    <div className="text-center font-weight-bold mt-3">{username}</div>
                    <div className="pt-4">
                        {!this.state.followed ? (<button className="btn btn-primary w-100 py-0 font-weight-bold" onClick={() => { this.setState({ followed: true }); this.props.onfollowTheUser(_id); }}>Follow</button>) : (
                            <button className="btn btn-light w-100 py-0 font-weight-bold">Followed</button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
