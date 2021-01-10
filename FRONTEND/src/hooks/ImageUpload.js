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
                    src="https://instagram.fbkk8-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbkk8-3.fna.fbcdn.net&_nc_ohc=OqojzNR1_M0AX_TLOA8&oh=1d692889fe9d6514afc3d269733727c4&oe=5FFD060F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
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
