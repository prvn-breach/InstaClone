import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Suggestion extends Component {

    constructor() {
        super();
        this.isFollowed = false;
    }

    render() {
        const { username } = this.props;
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <img
                            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                            alt=""
                            className="rounded-circle border"
                            style={{ width: '39px' }}
                        />
                        <Link to={`/profile/${username}`} className="nav-link d-inline text-dark">{username}</Link>
                    </div>
                    <div>
                        {!this.isFollowed ? (<a href="##" className="nav-link d-inline" onClick={() => this.isFollowed = true}>Follow</a>) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle mx-3" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
