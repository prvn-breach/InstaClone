import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

//  Load Actions
import { deletePost } from "../../../actions/postActions";

// Load Validation
import isEmpty from "../../../validation/is_empty";

// Import Styles
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Card, CardHeader, CardContent, CardMedia, Avatar,
    IconButton, ListItemText, Divider, InputBase, ListItemIcon, 
    Menu, MenuItem
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';

// Import Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: '100%',
        margin: theme.spacing(2),
        borderRadius: 0
    },
    media: {
        height: 400,
    },
    cardcontent: {
        width: 800
    },
    text: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }
}));


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function PostMenu(props) {
    
    return (<StyledMenu
        id="customized-menu"
        anchorEl={props.item}
        keepMounted
        open={Boolean(props.item)}
        onClose={props.onHandleClose} 
    >
        <StyledMenuItem>
            <ListItemIcon>
                <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit" />
        </StyledMenuItem>
        <StyledMenuItem>
            <ListItemIcon>
                <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete"/>
        </StyledMenuItem>
    </StyledMenu>)
}

export default function Post(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    // get props
    const { loading = false, post } = props;

    // Take only 5 latest comments
    // Later we use sockets
    let comments;
    if (post && post.comments) {
        comments = post.comments.slice(0,5);
    }

    // For comment form 
    const [comment, addComment] = useState('');
    const commentInputChange = (e) =>  {
        addComment(e.target.value);
    }

    // Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const postMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    loading ? (
                        <Skeleton animation="wave" variant="circle" width={40} height={40} />
                    ) : (
                            <Avatar
                                alt="Ted talk"
                                src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                            />
                        )
                }
                action={
                    loading ? null : (
                        <React.Fragment>
                            <IconButton aria-label="settings" onClick={postMenuClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <PostMenu 
                                item={anchorEl} 
                                onHandleClose={handleClose}
                                deleteClicked={() => dispatch(deletePost(post._id))}
                            />
                        </React.Fragment>
                    )
                }
                title={
                    loading ? (
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                    ) : post.name
                }
                subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : '5 hours ago'}
            />

            {/* Post Text */}
            {loading ? (
                <Skeleton animation="wave" variant="rect" className={classes.media} />
            ) : post.text && (
                <div className={classes.text}>{post.text}</div>
            )}

            {/* Post Image */}
            {loading ? (
                <Skeleton animation="wave" variant="rect" className={classes.media} />
            ) : post.image && (
                <CardMedia
                    className={classes.media}
                    image={`http://localhost:5000/${post.image}`}
                    title={post.name}
                />
            )}

            {/* Add Icons & Messages */}
            <CardContent className={classes.cardcontent}>
                {loading ? (
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <div className="container">
                                <div className="row">
                                    {!post.likes.find(like => like.user === post.user)
                                        ? <IconButton aria-label="like" onClick={props.like}><FavoriteBorderIcon /></IconButton>
                                        : <IconButton aria-label="unlike" onClick={props.unlike}><FavoriteIcon color="error" /></IconButton>    
                                    }
                                    <IconButton aria-label="comment"><ChatBubbleOutlineIcon /></IconButton>
                                    <IconButton aria-label="share"><ScreenShareIcon /></IconButton>
                                    <IconButton aria-label="save"><BookmarkBorderIcon /></IconButton>
                                </div>

                                <div className="row" style={{ margin: 0 }}><b>{post.likes.length} likes</b></div>
                               
                                <div className="row" style={{ margin: 0 }}>
                                    {comments.length > 0 ? comments.map((comment, index) => (
                                        <p key={index}>
                                            <b>{comment.name}</b>&nbsp;&nbsp;{comment.text}
                                        </p>
                                    )) : (<div></div>)}
                                </div>

                                <div className="row"><Divider /></div>

                                <div className="row">
                                    <InputBase
                                        placeholder="Add message"
                                        inputProps={{ 'aria-label': 'message' }}
                                        style={{ width: '70%' }}
                                        onChange={commentInputChange}
                                    />

                                    <IconButton 
                                        aria-label="send" 
                                        onClick={props.commentClicked(comment, post._id)} 
                                        disabled={isEmpty(comment)} 
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
            </CardContent>
        </Card>
    );
}

Post.propTypes = {
    loading: PropTypes.bool
};
