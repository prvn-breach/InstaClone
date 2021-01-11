import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        const { text, name } = this.props;
        return (
            <div>
                <div className="pl-3 mb-1">
                    <span className="font-weight-bold" style={{ fontSize: '15px' }}>{name}</span>
                    <span className="ml-2" style={{ fontSize: '15px' }}>{text}</span>
                    {/* <span className="text-muted d-block" style={{ fontSize: '11px' }}>View all 9 comments</span> */}
                </div>
            </div>
        )
    }
}
