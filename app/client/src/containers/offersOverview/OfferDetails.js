import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    makeStyles,
    Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { exampleData, simulateHTTPRequest } from '../../__MOCK__/mockData';

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
    const [offer, setOffer] = React.useState(null);
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
            console.log('Set', res[0]);

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

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth={true}
            maxWidth="md"
        >
            {props.open ? (
                <>
                    <DialogTitle>
                        {offer ? offer.ikId : 'Undefined'}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </>
            ) : null}
        </Dialog>
    );
};
