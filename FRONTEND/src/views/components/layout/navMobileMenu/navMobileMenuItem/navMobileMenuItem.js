import React, { Component } from "react";

import {
    IconButton,
    Badge,
    MenuItem,
} from "@material-ui/core";

class NavMobileMenuItem extends Component {
    render() {
        const TagName = this.props.tag;
        return (
            <MenuItem>
                <IconButton color="inherit">
                    {this.props.badge ? (
                        <Badge badgeContent={this.props.badge} color="secondary">
                            <TagName />
                        </Badge>) : (<TagName />)}
                </IconButton>
                {this.props.children}
            </MenuItem>
        )
    }
};

export default NavMobileMenuItem;