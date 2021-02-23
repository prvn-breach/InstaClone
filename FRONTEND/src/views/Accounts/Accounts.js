import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "./TabPanel/TabPanel";

import EditPage from "./EditPage/EditPage";
import ChangePwd from "./ChangePwd/ChangePwd";

import "./Accounts.css";

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            params: {
                "edit": 0,
                "change_pwd": 1,
                "notifications": 2,
                "activity": 3
            }
        }
        this.state.value = this.state.params[props.match.params.tab];

        this.handleChange = this.handleChange.bind(this);
        this.a11yProps = this.a11yProps.bind(this);
    }

    a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    handleChange(event, newValue) {
        let keys = Object.keys(this.state.params);
        let tab_name = keys.find(key => this.state.params[key] === newValue);

        // Update TabName in URL
        this.props.history.push("/accounts/" + tab_name);

        // Update state
        this.setState({ value: newValue });
    };

    render() {
        return (
            <div className="container" id="accounts_page">
                <div className="accounts border" style={{ marginTop: '80px' }}>
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
                        <Tab label="Notifications" {...this.a11yProps(2)} />
                        <Tab label="Login Activity" {...this.a11yProps(3)} />
                    </Tabs>
                    <TabPanel value={this.state.value} index={0}>
                        <EditPage />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <ChangePwd />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        Notifications
                    </TabPanel>
                    <TabPanel value={this.state.value} index={3}>
                        Activity
                    </TabPanel>
                </div>
            </div>
        )
    }
}

export default Accounts;

