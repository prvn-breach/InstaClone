import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "./TabPanel/TabPanel";

import "./Accounts.css";

class Accounts extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            params: {
                "edit": 0,
                "change_pwd": 1,
                "activity": 2
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.a11yProps = this.a11yProps.bind(this);
    }

    // static getDerivedStateFromProps(props) { 
    //     if (props.match.params.tab == "edit") {
    //         return {value: 0};
    //     }

    //     if (props.match.params.tab == "changepwd") {
    //         return {value: 1};
    //     }

    //     if (props.match.params.tab == "activity") {
    //         return {value: 2};
    //     }
    // }

    // componentDidMount() {
    //     const { tab } = useParams();
    //     console.log(tab);
    //     this.setState({value: this.state.params[tab]})
    // }

    // shouldComponentUpdate(props, state) {
    //     console.log(state);
    //     // if (this.state.params[props.match.params.tab]!==state.value) {
    //     //     return false;
    //     // }
    //     // return true;
    // }

    a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    handleChange(event, newValue){
        this.setState({value: newValue});
    };

    render() {
        return (
            <div>
                <div className="accounts border" style={{marginTop: '80px'}}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={this.state.value}
                        onChange={this.handleChange}
                        aria-label="Vertical tabs example"
                        className="tabs border-right"
                    >
                        <Tab label="Edit Profile" {...this.a11yProps(0)} />
                        <Tab label="Change Password" {...this.a11yProps(1)} />
                        <Tab label="Login Activity" {...this.a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={this.state.value} index={0}>
                        Tab Panel 1
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        Tab Panel 2
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        Tab Panel 3
                    </TabPanel>
                </div>
            </div>
        )
    }
}

export default Accounts;

