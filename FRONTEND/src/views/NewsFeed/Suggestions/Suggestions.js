import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Suggestion from "./Suggestion/Suggestion";

export default class Suggestions extends Component {
    render() {
        let suggestions = this.props.suggestions.slice(0, 4).map((suggestion, i) => <Suggestion key={i} {...suggestion} />)
        return (
            <div className="position-fixed" style={{ width: '30%' }}>
                    <div className="d-flex justify-content-between align-items-center" >
                        <div>
                            <img
                                src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                                alt=""
                                className="rounded-circle border"
                                style={{ width: '60px' }}
                            />
                            <Link to={`/profile/${this.props.current_user.username}`} className="nav-link d-inline text-dark">{this.props.current_user.username}</Link>
                        </div>
                        <div>
                            <a href="#" className="nav-link d-inline">switch</a>
                        </div>
                    </div>

                    <div className="mt-3 d-flex justify-content-between align-items-center">
                        <span className="text-secondary">Suggestions For You </span>
                        <a href="#" className="nav-link text-dark">See All</a>
                    </div>

                    <div className="mt-3">
                        {suggestions}
                    </div>
                </div>
        )
    }
}
