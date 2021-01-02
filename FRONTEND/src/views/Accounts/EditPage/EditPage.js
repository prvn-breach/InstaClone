import React, { Component } from 'react'

import ImageUpload from "../../../hooks/ImageUpload";

export default class EditPage extends Component {
    render() {
        return (
            <div>
                <form id="edit_page">
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
                        <label className="col-sm-2 col-form-label font-weight-bold">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-sm" placeholder="Name" />
                            <small className="form-text text-muted">
                                Help people discover your account by using the name you're 
                                known by: either your full name, nickname, or business name.
                                <br />
                                You can only change your name twice within 14 day
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Username</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-sm" placeholder="Username" />
                            <small className="form-text text-muted">
                                In most cases, you'll be able to change your username back to for another 14 days.
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Bio</label>
                        <div className="col-sm-10">
                            <textarea className="form-control form-control-sm" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control form-control-sm" placeholder="Email" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Phone Number</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control form-control-sm" placeholder="Phone Number" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Gender</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-sm" placeholder="Gender" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2"></label>
                        <div className="col-sm-10">
                            <button className="btn btn-primary btn-sm">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
