import React from 'react';
import { IconButton } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import { Edit, Delete, Info } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    itembox: {
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(0.2),
        },
        '& hr': {
            margin: theme.spacing(0, 0.2),
        },
    },
}));

const CustomIconRow = (props) => {
    const classes = useStyles();

    let items = [];

    for (let [key, value] of props.icons.entries()) {
        items.push(
            <IconButton
                key={'IconButton-' + key}
                onClick={props.clickHandlers[key]}
            >
                {value}
            </IconButton>
        );
        if (key < props.icons.length - 1) {
            items.push(
                <Divider
                    key={'Divider-' + key}
                    orientation="vertical"
                    flexItem
                />
            );
        }
    }
    items.push(props.dialogs);
    return (
        <Grid container alignItems="center" className={classes.itembox}>
            {items}
        </Grid>
    );
};

export default CustomIconRow;
