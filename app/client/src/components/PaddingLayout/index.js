import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const drawerWidth = 240;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(7),
        overflowX: 'hidden',
    },
    contentShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    paper: {
        marginBottom: '2em',
    },
});

const PaddingLayout = (props) => {
    const { classes, children, title, titlePadding } = props;
    return (
        <div className={classes.content}>
            <Paper
                className={classes.paper}
                style={{ padding: titlePadding ? titlePadding : null }}
            >
                <Typography variant="h4">{title ? title : null}</Typography>
            </Paper>
            {children}
        </div>
    );
};

export default withStyles(styles)(PaddingLayout);
