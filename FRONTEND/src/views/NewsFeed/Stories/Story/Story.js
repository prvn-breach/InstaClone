import React, { Component } from 'react'

import "./Story.css";

export default class Story extends Component {
    render() {
        return (
            <div>
                <div className="p-2">
                    <button type="button" className="border-0 bg-light">
                        <img
                            src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
                            className="rounded-circle mb-2"
                            width="56"
                            height="56"
                        />
                        <span className="d-block" style={{ fontSize: '12px' }}>akhil_kumar</span>
                    </button>
                </div>
            </div>
        )
    }
}
