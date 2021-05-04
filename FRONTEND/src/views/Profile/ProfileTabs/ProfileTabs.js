import React from 'react'

import ProfilePosts from "../ProfilePosts/ProfilePosts";
import SavedPosts from "../SavedPosts/SavedPosts";
import Tagged from "../Tagged/Tagged";

const Components = {
    'posts': ProfilePosts,
    'saved': SavedPosts,
    'tagged': Tagged
}

export default ({ page }) => {
    const SpecificPage = Components[page];
    return <SpecificPage />;
}
