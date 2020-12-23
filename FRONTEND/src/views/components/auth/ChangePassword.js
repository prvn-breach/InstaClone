import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import {
    Container, CssBaseline, Typography, TextField,
    Button, Link,
    makeStyles, withStyles
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { purple } from "@material-ui/core/colors";

import { useSelector, useDispatch } from "react-redux"; // connect component with redux store
import { changePassword } from "../../../actions/authActions"; // Actions
import isEmpty from '../../../validation/is_empty';

// Apply Styles for Html
const useStyles = makeStyles((theme) => ({
    pwdDiv: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    pwdAvatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    pwdForm: {
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

const ChangePassword = () => {
    const classes = useStyles();

    const [newPwd, setNewPwd] = useState({
       password: '',
       password_confirmation: ''
    });

    // Get Params from Route
    const { userId, uuid } = useParams();

    // Store Data
    const onChange = (name, value) => {
        let new_pwd = newPwd;
        new_pwd[name] = value;
        new_pwd['userId'] = userId;
        new_pwd['id'] = uuid;
        setNewPwd(new_pwd);
    }

    // Get Redux Store Data
    const {reset, errors} = useSelector(state => { return state; });
    const dispatch = useDispatch();

    // Form Submit
    const formSubmit = (event) => {
        event.preventDefault();
        dispatch(changePassword(newPwd));
    }

    let renderer;
    if(!reset['response']) {
        renderer = (
            <div className={classes.pwdDiv}>
                <Typography component="h1" variant="h5">
                    Create New Password
                </Typography>
                <form onSubmit={formSubmit} className={classes.pwdForm} noValidate>
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
                    <ColorButton 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                    >
                        Submit
                    </ColorButton>
                </form>
            </div>
        );
    } else if(reset['response']['success'] && isEmpty(errors)) {
        renderer = (
            <div className={classes.pwdDiv}>
                <Alert severity="success">
                    Password changed successfully. 
                    Please Go to this website {<Link href="/login" variant="body2"><b>Instagram Clone</b></Link>}.
                </Alert>
            </div>
        );
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {renderer}
        </Container>
    )
}

export default ChangePassword;