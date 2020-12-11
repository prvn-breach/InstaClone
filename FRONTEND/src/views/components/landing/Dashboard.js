import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Load Components
import Post from "./Post";
import UsersFollow from "./UsersFollow";
import CreatePostForm from "./CreatePostForm";
import Breadcrumbs from "../common/Breadcrumbs";

// Load Actions
import { getPosts, createComment, likePost, unLikePost, createPost } from "../../../actions/postActions";
import { getUsers } from "../../../actions/userActions";

// Import Styles
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, GridList, Grid, CircularProgress
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: "10%",
    },
    gridList: {
        width: 700,
        height: 500,
    },
    inline: {
        display: 'inline',
    },
    list: {
        width: '100%',
        maxWidth: '36ch',
    },
    listtext: {
        marginLeft: 10
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    // Create New Post
    const createNewPost = (newPost) => evt => dispatch(createPost(newPost));

    // Return props
    const { auth, posts, users } = useSelector((state) => { return state });

    if(posts['post']) {
        posts['posts'].unshift(posts.post);
    }

    // By using this Hook, you tell React that your component needs to do something after render
    useEffect(() => {
        if (!auth['isAuthenticated']) {
            history.push('/login');
        }
        dispatch(getPosts());
        dispatch(getUsers());
    }, [auth, history, dispatch]);

    const like = (id) => (evt) => {
        dispatch(likePost(id));
    };
    const unlike = (id) => (evt) => {
        dispatch(unLikePost(id));
    };

    // Trigger Function when send comment
    const sendComment = (comment, id) => (evt) => {
        dispatch(createComment(comment, id));
    }

    // Update Comments List and Likes
    // Later we use sockets
    if (posts.post) {
        posts['posts'].map(post => {
            if (post._id === posts.post._id) {
                post.comments = posts.post.comments
                post.likes = posts.post.likes
            }
        })
    }

    return (
        <React.Fragment>
        {/* <Breadcrumbs /> */}
        <Container component="main" maxWidth="lg" className={classes.root}>
            <GridList cellHeight={200} className={classes.gridList} cols={1}>
            <CreatePostForm createPost={createNewPost} />
                {(posts.hasOwnProperty('posts') && posts['posts'].length > 0)   // posts
                    ? posts['posts'].map((post, index) => (
                        <Post
                            key={index}
                            post={post}
                            commentClicked={sendComment}
                            like={like(post._id)}
                            unlike={unlike(post._id)}
                        />
                    )
                    )
                    : <Post loading />}
            </GridList>
            {users['loading'] 
                ? <CircularProgress disableShrink /> 
                : <UsersFollow auth={auth} users={users['users']}/>
            }
        </Container>
        </React.Fragment>
    )
}
