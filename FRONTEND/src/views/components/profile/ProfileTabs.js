import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { 
    Typography, Grid, Tabs, Tab, Box 
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        marginTop: theme.spacing(5),
        backgroundColor: 'white',
    },
    tabs: {
        backgroundColor: 'rgba(var(--b3f,250,250,250),1)'
    },
    image: {
        width: '100%',
        heigth: '100%'
    },
    grid: {
        backgroundColor: 'white'
    },
    grid2: {
        padding: '10%'
    }
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
                {value === index && (
                <Box><Typography>{children}</Typography></Box>
            )}
        </div>
    );
}

// Proptype for profile tabs define datatypes
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
const a11yProps = (index) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

const LinkTab = (props) => {
    return (
        <Tab
            component="a"
            onClick={(event) => {
            event.preventDefault();
            }}
            {...props}
        />
    );
}

export default function ProfileTabs() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                className={classes.tabs}
            >
                <LinkTab label="Posts" {...a11yProps(0)} />
                <LinkTab label="Item Two" {...a11yProps(1)} />
                <LinkTab label="Item Three" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container className={classes.grid}>
                    <Grid item xs={6}>
                        <img 
                            src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg" 
                            className={classes.image}
                            alt=""
                        />
                    </Grid>
                    <Grid item xs={5} className={classes.grid2}>
                        <Typography variant="h6" component="h1" className={classes.typography}>
                            Start capturing and sharing your moments.
                        </Typography>
                    </Grid>
                </Grid>
            </TabPanel>
        </div>
    )
}
