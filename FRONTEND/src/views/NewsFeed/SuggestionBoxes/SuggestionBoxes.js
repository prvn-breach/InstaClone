import React, { Component } from 'react'

import SuggestionBox from "./SuggestionBox/SuggestionBox";
export default class SuggestionBoxes extends Component {
    render() {

        // let suggestion_boxes_list = [
        //     { id: 1, username: "prvn_king" },
        //     { id: 2, username: "peter_parker" },
        //     { id: 4, username: "billgates" },
        //     { id: 5, username: "elon_musk" },
        //     { id: 6, username: "zeff_bezus" },
        // ];

        let suggestion_boxes = this.props.suggestions.map((suggestion_box, i) => <SuggestionBox key={i} onfollowTheUser={(user_id) => this.props.onfollowUser(user_id)} {...suggestion_box} />)
        return (
            <React.Fragment>
                <div className="w-100 col-lg-12 mb-2">
                    <span className="text-muted">Suggestions For You</span>
                    <a href="#" className="nav-link p-0 float-right">See All</a>
                </div>
                <div id="suggestion_col" className="col-lg-12 ml-0 pl-3">
                    <div className="d-flex justify-content-start" style={{ overflowX: "auto" }}>{suggestion_boxes}</div>
                </div>
            </React.Fragment>
        )
    }
}
