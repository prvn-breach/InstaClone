import React, { Component } from 'react'
import { connect } from "react-redux";
import classnames from "classnames";

class Message extends Component {

    isCurrentUser() {
        return this.props.receiver_id === this.props.current_user.id;
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
                    (img && !this.isCurrentUser()) && (
                        <img
                            src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
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
