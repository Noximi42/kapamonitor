import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    makeStyles,
    Button,
    DialogContent,
    Grid,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LoadingDialog } from './LoadingDialog';
import { getOffer } from '../../services/backend-rest-service';
import Moment from 'react-moment';

const useStyles = makeStyles({});

export const OfferDetails = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    let [offer, setOffer] = React.useState(null);
    let [loading, setLoading] = React.useState(true);
    useEffect(() => {
        async function fetchRows() {
            const res = await getOffer(props.row);

            if (res.status === 200) {
                if (res.data) {
                    setOffer(res.data);
                    setTimeout(() => setLoading(false), 1000);
                }
            }
        }
        fetchRows();
    }, []);

    return loading ? (
        <LoadingDialog open={true}></LoadingDialog>
    ) : (
        <Dialog
            open={props.open}
            onClose={() => {
                setOffer(null);
                setLoading(true);
                props.handleClose();
            }}
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle>
                <Grid container>
                    <Grid item xs={12}>
                        {offer
                            ? offer.resource.name +
                              ' - ' +
                              offer.number +
                              ' ' +
                              offer.resource.unitOfMeasure
                            : null}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>
                            {offer ? (
                                <>
                                    erstellt am
                                    <Moment format=" DD.MM.YYYY">
                                        {offer.creationDate}
                                    </Moment>
                                </>
                            ) : null}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent style={{ overflowY: 'visible' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom>
                            {' '}
                            Ihr Anbieter
                        </Typography>
                        <Typography variant="body2">
                            {offer.contactInfo.firstName}{' '}
                            {offer.contactInfo.lastName}
                        </Typography>
                        <Typography variant="body2">
                            <a href={'mailto:' + offer.contactInfo.email}>
                                {offer.contactInfo.email}
                            </a>
                        </Typography>
                        <Typography variant="body2">
                            <a href={'tel:' + offer.contactInfo.phone}>
                                {offer.contactInfo.phone}
                            </a>
                        </Typography>
                        {offer.location ? (
                            <>
                                <Typography variant="body2">
                                    {offer.location.address.street}{' '}
                                    {offer.location.address.houseNumber}
                                </Typography>
                                <Typography variant="body2">
                                    {offer.location.address.zipCode}{' '}
                                    {offer.location.address.city}
                                </Typography>{' '}
                            </>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom>
                            Angebotsdetails
                        </Typography>
                        <Typography variant="subtitle1">
                            {offer.resource.name +
                                ' - ' +
                                offer.number +
                                ' ' +
                                offer.resource.unitOfMeasure}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};
