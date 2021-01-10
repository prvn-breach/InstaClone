import React from 'react';
import Picker from 'emoji-picker-react';

const EmojiPicker = (props) => {
    return (
        <Picker
            onEmojiClick={props.pickImage()}
            pickerStyle={{ width: '100%' }}
            disableSearchBar
            native
            preload
        />
    );
};

export default EmojiPicker;