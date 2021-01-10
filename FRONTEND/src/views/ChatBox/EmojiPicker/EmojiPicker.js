import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const EmojiPicker = () => {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    return (
        <div>
            <Picker onEmojiClick={onEmojiClick} disableSearchBar />
        </div>
    );
};

export default EmojiPicker;