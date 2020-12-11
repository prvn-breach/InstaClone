import React, { useState } from 'react'

import {
    Container, CssBaseline, Typography, TextField,
    Button, makeStyles, Avatar, Grid, Link
} from "@material-ui/core";
import { Instagram } from "@material-ui/icons";

import { useSelector, useDispatch } from "react-redux"; // connect component with redux store
import { registerUser } from "../../../actions/authActions"; // Actions

// Apply Styles for Html
const useStyles = makeStyles((theme) => ({
    regDiv: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    regAvatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    regForm: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    regSubmit: {
        margin: theme.spacing(3, 0, 2),
    }
}))

const Register = (props) => {
    const classes = useStyles();

    const [newUser, setNewUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    // Store Data
    const onChange = (name, value) => {
        let newUserData = newUser;
        newUserData[name] = value;
        setNewUser(newUserData);
    }

    // Get Redux Store Data
    const {errors} = useSelector(state => { return state; });
    const dispatch = useDispatch();

    // Form Submit
    const formSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser(newUser));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.regDiv}>
                 <Avatar className={classes.regAvatar}>
                    <Instagram />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Your Account
                </Typography>
                <form onSubmit={formSubmit} className={classes.regForm} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={({target}) => onChange(target.name, target.value)}
                        label="Name"
                        helperText={errors.name}
                        error={!!errors.name}
                        name="name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={({target}) => onChange(target.name, target.value)}
                        label="Username"
                        helperText={errors.username ?? "username should be unique."}
                        error={!!errors.username}
                        name="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={({target}) => onChange(target.name, target.value)}
                        label="Email Address"
                        helperText={errors.email}
                        error={!!errors.email}
                        name="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={({target}) => onChange(target.name, target.value)}
                        helperText={errors.password}
                        error={!!errors.password}
                        name="password"
                        label="Password"
                        type="password"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={({target}) => onChange(target.name, target.value)}
                        helperText={errors.password_confirmation}
                        error={!!errors.password_confirmation}
                        name="password_confirmation"
                        label="Repeat Password"
                        type="password"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.regSubmit}
                    >
                        Create New Account
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Please login."}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Register;