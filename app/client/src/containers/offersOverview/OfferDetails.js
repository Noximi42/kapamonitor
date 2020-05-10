import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    makeStyles,
    Button,
    CircularProgress,
    Card,
    DialogContent,
    DialogContentText,
    Grid,
    IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { exampleData, simulateHTTPRequest } from '../../__MOCK__/mockData';
import { LoadingDialog } from './LoadingDialog';

const useStyles = makeStyles({
    // checkboxFormControl: {
    //     marginRight: 100,
    // },
    // inputFormControl: {
    //     marginRight: 40,
    // },
});

export const OfferDetails = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    let [offer, setOffer] = React.useState(null);
    let [loading, setLoading] = React.useState(true);
    useEffect(() => {
        async function fetchRows() {
            const res = await simulateHTTPRequest(exampleData).then(
                (result) => {
                    return result.filter((object) =>
                        object.ikId === props.row ? true : false
                    );
                }
            ); //getAllOffers();
            setOffer(res[0]);
            setLoading(false);

            // TODO: Wenn der Endpunkt im Backend fertig ist.
            // if (res.status === 200) {
            //     if (res.data.length > 0) {
            //         const mockOffers = res.data.map((offer) => ({
            //             ...offer,
            //             capacity: Math.floor(Math.random() * 100),
            //         }));
            //         props.setOffers(mockOffers);
            //     }
            // }
        }
        fetchRows();
    });

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
            <DialogTitle>{offer ? offer.ikId : null}</DialogTitle>
            <DialogContent>
                <p>Angebotsdetails</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};
