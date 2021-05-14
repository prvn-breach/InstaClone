import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        width: '100%',
        marginLeft: '5%',
        marginRight: '5%'
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <CardHeader
            className={classes.cardHeader}
            avatar={<Skeleton animation="wave" variant="circle" width={50} height={50} />}
            action={null}
            title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
    );
}