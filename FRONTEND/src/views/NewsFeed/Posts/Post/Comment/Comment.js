import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        return (
            <div>
                <div className="pl-3 mb-1">
                    <span className="font-weight-bold" style={{ fontSize: '15px' }}>sundar_pichai</span>
                    <span className="ml-2" style={{ fontSize: '15px' }}>nice website</span>
                    {/* <span className="text-muted d-block" style={{ fontSize: '11px' }}>View all 9 comments</span> */}
                </div>
            </div>
        )
    }
}
