import React, { Component } from 'react'

import "./SuggestionBox.css"

export default class SuggestionBox extends Component {
    render() {
        return (
            <div>
                <div className="border rounded p-3 mr-2" style={{ height: "185px" }}>
                    <div className="pl-4 pr-4">
                        <img
                            src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
                            height="50"
                            width="50"
                            className="rounded-circle"
                        />
                    </div>
                    <div className="text-center font-weight-bold mt-3">
                        Praveen
                                </div>
                    <div className="pt-4">
                        <button
                            className="btn btn-primary w-100 py-0 font-weight-bold"
                        >Follow</button>
                    </div>
                </div>
            </div>
        )
    }
}
