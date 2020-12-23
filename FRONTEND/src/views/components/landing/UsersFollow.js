import React from 'react'

// Import Styles
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Link
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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



function UsersFollow(props) {
    const classes = useStyles();
    const { auth, users } = props;
    return (
        <List className={classes.list}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" className={classes.large} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    className={classes.listtext}
                    primary={auth.user.username}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {auth.user.username}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <ListItem>
                <Typography component="h1" color="textSecondary" style={{ marginRight: 90 }}> Suggestions For You </Typography>
                <Link href="#" variant="body2" color="primary"> See All </Link>
            </ListItem>
            {users.map((user, index) => (
                <ListItem key={index}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                    <Link href="#" variant="body2">Follow</Link>
                </ListItem>
            ))}
        </List>
    )
}

export default UsersFollow;
