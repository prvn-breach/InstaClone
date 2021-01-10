import React, { Component } from 'react'

import Story from "./Story/Story";

import "./Stories.css";

export default class Stories extends Component {
    render() {

        // const list_stories = [1,2,3,4,5,6,7,8,9,10];
        const list_stories = [
            { id: 1, username: "prvn_king" },
            { id: 2, username: "peter_parker" },
            { id: 4, username: "billgates" },
            { id: 5, username: "elon_musk" },
            { id: 6, username: "zeff_bezus" },
        ];
        const stories = list_stories.map((story, i) => <Story key={i} {...story} />);

        return (
            <div>
                <div className="" id="story_column">
                    <div className="d-flex bg-light border-0" style={{ height: '120px', overflowX:"scroll" }}>

                        {/* NEW STORY */}
                        <div className="p-2">
                            <button type="button" className="border-0 bg-light">
                                <img
                                    src="https://www.searchpng.com/wp-content/uploads/2019/07/Instagram-Add-Story-Icon-715x715.jpg"
                                    className="rounded-circle mb-2"
                                    width="56"
                                    height="56"
                                />
                                <span className="d-block" style={{ fontSize: '12px' }}>Your Story</span>
                            </button>
                        </div>

                        {/* STORIES */}
                        {stories}
                    </div>
                </div>
            </div>
        )
    }
}
