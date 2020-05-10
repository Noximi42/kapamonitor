import React from 'react';
import {
    Dialog,
    DialogTitle,
    makeStyles,
    CircularProgress,
    DialogContent,
    Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({});

export const LoadingDialog = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <Dialog open={props.open} fullWidth={true} maxWidth="xs">
            <DialogTitle>Lade Details...</DialogTitle>
            <DialogContent>
                <Grid
                    style={{
                        height: '100px',
                    }}
                    container
                    alignItems="flex-start"
                    justify="center"
                    direction="row"
                >
                    <CircularProgress size={60} />
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
