import React, { Component } from 'react'
import { connect } from "react-redux";
import classnames from "classnames";

class Message extends Component {

    isCurrentUser() {
        return this.props.sender_id === this.props.current_user._id;
    }

    render() {
        const { img, message, time, is_time_showing } = this.props;
        return (
            <div className="w-100" id="message">

                {/* TIME */}
                {
                    is_time_showing && (
                        <span 
                            id="message_time" 
                            className="d-block text-muted text-center" 
                            style={{fontSize: '10px'}}
                            >{time}</span>
                    )
                }


                {/* IMAGE */}
                {
                    (!this.isCurrentUser()) && (
                        <img
                            src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
                            className="rounded-circle float-left mt-4"
                            width="30"
                            height="30"
                            alt=""
                        />
                    )
                }

                {/* TEXT */}
                <span
                    id="message_text"
                    className={classnames("m-2 p-2", {
                        "float-right": this.isCurrentUser(),
                        "bg-white border float-left": !this.isCurrentUser()
                    })}
                >{message}</span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    current_user: state.auth.user
});

export default connect(mapStateToProps, {})(Message);
