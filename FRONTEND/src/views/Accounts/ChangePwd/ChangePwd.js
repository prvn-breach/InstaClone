import React, { Component } from 'react'
import { Link } from "react-router-dom";

import ImageUpload from "../../../hooks/ImageUpload";

export default class ChangePwd extends Component {
    render() {     
        return (
            <div>
                <form id="change_pwd">
                    <div className="form-group">
                        <div className="col-6 d-flex m-0 p-0 justify-content-between">
                            <ImageUpload 
                                width="50"
                                style={ {cursor: "pointer"} }
                            />
                            <span className="h4 text-dark">prvndp6</span>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label font-weight-bold">Old Password</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control bg-light" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label font-weight-bold">New Password</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control bg-light" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label font-weight-bold">Confirm New Password</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control bg-light" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-9 offset-sm-3">
                            <button className="btn btn-primary btn-sm">Change Password</button>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-9 offset-sm-3">
                            <Link  className="nav-link m-0 p-0 font-weight-bold">Forgot Password?</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
