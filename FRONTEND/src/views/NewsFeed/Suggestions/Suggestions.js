import React, { Component } from 'react'

import Suggestion from "./Suggestion/Suggestion";

export default class Suggestions extends Component {
    render() {
        return (
            <div>
                <div className="position-fixed" style={{ width: '30%' }}>
                    <div className="d-flex justify-content-between align-items-center" >
                        <div>
                            <img
                                src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                                alt=""
                                className="rounded-circle border"
                                style={{ width: '60px' }}
                            />
                            <a href="#" className="nav-link d-inline text-dark">prvn_kumar</a>
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
                        <Suggestion />
                        <Suggestion />
                        <Suggestion />
                        <Suggestion />
                    </div>
                </div>
            </div>
        )
    }
}
