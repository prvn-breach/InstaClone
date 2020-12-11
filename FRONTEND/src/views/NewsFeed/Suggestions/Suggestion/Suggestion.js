import React, { Component } from 'react'

export default class Suggestion extends Component {
    render() {
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
                        <a href="#" className="nav-link d-inline text-dark">prvn_kumar</a>
                    </div>
                    <div>
                        <a href="#" className="nav-link d-inline">Follow</a>
                    </div>
                </div>
            </div>
        )
    }
}
