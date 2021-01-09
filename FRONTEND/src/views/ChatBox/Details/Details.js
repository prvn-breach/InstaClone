import React, { Component } from 'react'

// import Conversations from "../Conversations/Conversations";

export default class Details extends Component {
    render() {
        // let conversations = [{ id: 1, username: "prvn_king", is_active: true }];
        return (
            <div id="details">
                <div className="p-3 border-bottom">
                    <form>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" style={{fontSize: '15px'}}>Mute Messages</label>
                        </div>
                    </form>
                </div>

                <div className="p-3 border-bottom">
                    <label style={{fontWeight: '430'}}>Members</label>
                    {/* <div><Conversations conversations={conversations} /></div> */}
                </div>

                <div className="p-3 border-bottom">
                    <span className="d-block text-danger mb-2">Delete Chat</span>
                    <span className="d-block text-danger">Block</span>
                </div>
            </div>
        )
    }
}
