import React, { useEffect } from 'react';
import {
    TableContainer,
    Paper,
    TableCell,
    TableBody,
    Table,
    TableRow,
    TableHead,
    makeStyles,
    Grid,
} from '@material-ui/core';
import { getAllOffers, getOffer } from '../../services/backend-rest-service';
import PaddingLayout from '../../components/PaddingLayout';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    setOffers,
    updateOffers,
    setSearchFilter,
} from '../../store/offers/actions';
import { OfferSearchBox } from './OfferSearchBox';
import { OfferDetails } from './OfferDetails';
import { exampleData, simulateHTTPRequest } from '../../__MOCK__/mockData';

const useStyles = makeStyles({
    // table: {
    //     minWidth: 650,
    // },
    // tableRow: {
    //     cursor: 'pointer',
    // },
    // checkboxFormControl: {
    //     marginRight: 100,
    // },
    // inputFormControl: {
    //     marginRight: 40,
    // },
    // table: {
    //     flex: 1,
    // },
});

const getCellContent = (row, cellId) => {
    // console.log('row', row);
    // console.log('cellId', cellId);
    return row.ikId;
    // switch (cellId) {
    //     case 'resource':
    //         return `Handschuhe`;
    //         break;
    //     case 'amount':
    //         return `${row.capacity}`;
    //         break;
    //     default:
    //         return row[cellId];
    // }
};

const OffersOverview = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const headCells = [
        {
            id: 'resource',
            label: t('pages.offerOverview.table.resource'),
            numberic: false,
        },
        {
            id: 'amount',
            label: t('pages.offerOverview.table.amount'),
            numberic: true,
        },
        {
            id: 'price',
            label: t('pages.offerOverview.table.price'),
            numberic: true,
        },
        {
            id: 'postCode',
            label: t('pages.offerOverview.table.postcode'),
            numberic: true,
        },
        {
            id: 'location',
            label: t('pages.offerOverview.table.location'),
            numberic: true,
        },
    ];

    useEffect(() => {
        async function fetchRows() {
            const res = await simulateHTTPRequest(exampleData); //getAllOffers();

            const mockOffers = res.map((offer) => ({
                ...offer,
                capacity: Math.floor(Math.random() * 100),
            }));
            props.setOffers(mockOffers);

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
    }, []);

    function handleClickOpen(ikId) {
        setOpen(true);
        setSelectedRow(ikId);
    }
    return (
        <PaddingLayout>
            <TableContainer component={Paper}>
                <OfferSearchBox />
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {headCells.map((cell, index) => (
                                <TableCell key={index}>
                                    <strong>{cell.label}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.offers
                            ? props.offers.map((row, index) => (
                                  <TableRow
                                      key={row.id}
                                      onClick={() => handleClickOpen(row.ikId)}
                                      hover={true}
                                      className={classes.tableRow}
                                  >
                                      {headCells.map((cell, index) => (
                                          <TableCell key={'tableCell-' + index}>
                                              {getCellContent(row, cell.id)}
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              ))
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <OfferDetails
                open={open}
                row={selectedRow}
                handleClose={() => {
                    setOpen(false);
                }}
                key={selectedRow}
            />
        </PaddingLayout>
    );
};

// const mapStateToProps = (state) => ({
//     rawResources: [
//         //hard coded for debug purposes
//         {
//             id: 'handschuhe',
//             name: 'Handschuhe',
//             selected: true,
//         },
//         {
//             id: 'atemmasken',
//             name: 'Atemmasken',
//             selected: true,
//         },
//     ],
// });

const mapStateToProps = (state) => ({
    offers: state.offers.filteredOffers,
});

const mapDispatchToProps = {
    setOffers,
    updateOffers,
    setSearchFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersOverview);
