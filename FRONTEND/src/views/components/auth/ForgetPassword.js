import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert';
import {
    Container, CssBaseline, Typography, TextField,
    Button, makeStyles, withStyles
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

import { useSelector, useDispatch } from "react-redux"; // connect component with redux store
import { forgetPassword } from "../../../actions/authActions"; // Actions

import isEmpty from "../../../validation/is_empty";

// Apply Styles for Html
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    }
}))


const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
}))(Button);

export default function ForgetPassword() {
    const classes = useStyles();

    const [email, setEmail] = useState();

    // Store Data
    const onChange = (value) => {
        setEmail(value);
    }

    // Get Redux Store Data
    const {reset, errors} = useSelector(state => { return state; });
    const dispatch = useDispatch();

    // Form Submit
    const formSubmit = (event) => {
        event.preventDefault();
        dispatch(forgetPassword(email));
    }

    let renderSuccessMsg;
    if(reset['response'] && isEmpty(errors)) {
        renderSuccessMsg = (
            <Alert severity="success">
                We sent link to this <b>{email}</b>. 
                Please check and create new password.
            </Alert>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <form onSubmit={formSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={({target}) => onChange(target.value)}
                        label="Email Address"
                        helperText={errors.email}
                        error={!!errors.email}
                        name="email"
                        autoFocus
                    />
                    <ColorButton 
                        variant="contained" 
                        color="primary" 
                        className={classes.margin}
                        type="submit"
                    >
                        Send
                    </ColorButton>
                </form>
            </div>
            <div className={classes.paper}>
                {renderSuccessMsg}
            </div>
        </Container>
    )
}