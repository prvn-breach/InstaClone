import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Avatar, Typography, Container, Grid, Paper, Button, Tabs, Tab
} from "@material-ui/core";

// Load components
import ProfileTabs from "./ProfileTabs";


const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        marginTop: theme.spacing(5)
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    paper: {
        padding: theme.spacing(2)
    }
}));

export default function Profile() {
    const classes = useStyles();

    // const [value, setValue] = React.useState(0);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Avatar alt="Remy Sharp" src="https://pbs.twimg.com/profile_images/864282616597405701/M-FEJMZ0.jpg" className={classes.large} />
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={1} className={classes.paper}>
                        <Grid item xs={6}><Typography variant="h6" component="h3">Praveen</Typography></Grid>
                        <Grid item xs={5}>
                            <Button variant="contained" color="primary">
                                Edit
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className={classes.paper}>
                        <Paper square>
                            <Tabs
                                value={0}
                                variant="fullWidth"
                                textColor="primary"
                                xs={2}
                            >
                                <Tab aria-label="phone" label="0 posts" />
                                <Tab aria-label="favorite" label="0 following" />
                                <Tab aria-label="person" label="0 follower" />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <hr />

            {/*  Posts and other tabs*/}
            <ProfileTabs />
        </Container>
    )
}
