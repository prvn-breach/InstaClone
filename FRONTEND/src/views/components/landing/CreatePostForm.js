import React, { useState } from 'react';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { 
    Container, Card, TextField, CardActions, Button, IconButton
} from "@material-ui/core";

import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: '10%'
    },
    form: {
        '& > *': {
            margin: theme.spacing(2),
            width: '75ch',
        }
    },
    createPostInput: {
        maxWidth: 500
    }
}));

export default function SimpleCard(props) {
    const classes = useStyles();

    const [newPost, createNewPost] = useState({
        text: '',
        image: null
    });

    const inputChangeHandler = (event) => {
        let postDetails = newPost;
        if(event.target.name === 'text') {
            postDetails[event.target.name] = event.target.value;
        } else {
            postDetails[event.target.name] = event.target.files[0];
        }
        createNewPost(postDetails);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        props.createPost(newPost);
    }

    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
            <Card className={classes.card}>
                <form className={classes.form} onSubmit={onSubmit} noValidate autoComplete="off">
                    <TextField 
                        id="outlined-basic" 
                        label="Create Post" 
                        variant="outlined" 
                        name="text"
                        className={classes.createPostInput}
                        onChange={inputChangeHandler}
                    />
                    <CardActions>
                        <input 
                            accept="image/*" 
                            hidden 
                            className={classes.input} 
                            id="icon-button-file" 
                            type="file" 
                            name="image"
                            onChange={inputChangeHandler}
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <Button 
                            variant="contained" 
                            color="primary"
                            type="submit"
                        >
                            Post
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </Container>
        
    );
}