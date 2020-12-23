import React, { Component } from 'react'

import SuggestionBox from "./SuggestionBox/SuggestionBox";
export default class SuggestionBoxes extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="w-100 col-lg-12 mb-2">
                    <span className="text-muted">Suggestions For You</span>
                    <a href="#" className="nav-link p-0 float-right">See All</a>
                </div>
                <div id="suggestion_col" className="col-lg-12 ml-0 pl-3">
                    <div className="d-flex justify-content-start" style={{ overflowX: "auto" }}>
                        <SuggestionBox />
                        <SuggestionBox />
                        <SuggestionBox />
                        <SuggestionBox />
                        <SuggestionBox />
                        <SuggestionBox />
                        <SuggestionBox />
                        <SuggestionBox />
                        <SuggestionBox />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
