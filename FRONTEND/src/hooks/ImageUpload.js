import React, { Component } from 'react'

export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.imageInput = React.createRef();
        this.imageClick = this.imageClick.bind(this);
    }

    imageClick() {
        this.imageInput.current.click()
    }
    render() {
        return (
            <div>
                <img
                    src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
                    onClick={this.imageClick}
                    alt=""
                    {...this.props}
                />
                <input
                    type="file"
                    ref={this.imageInput}
                    className="d-none"
                />
            </div>
        )
    }
}
