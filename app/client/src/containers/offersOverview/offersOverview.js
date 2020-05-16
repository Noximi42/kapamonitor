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

const useStyles = makeStyles({});

const getCellContent = (item, cellId) => {
    switch (cellId) {
        case 'resource':
            return item.resource.name;
            break;
        case 'amount':
            return item.number;
            break;
        case 'postCode':
            return item.location ? item.location.address.zipCode : '-';
            break;
        case 'location':
            return item.location ? item.location.address.city : '-';
            break;
        default:
            return '-';
    }
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
            const res = await getAllOffers();

            if (res.status === 200) {
                if (res.data.length > 0) {
                    const offers = res.data.map((offer) => ({
                        ...offer,
                    }));
                    props.setOffers(offers);
                }
            }
        }

        fetchRows();
    }, []);

    function handleClickOpen(ikId) {
        setOpen(true);
        setSelectedRow(ikId);
    }
    return (
        <PaddingLayout className={classes.root}>
            <TableContainer component={Paper} className="table">
                <OfferSearchBox />
                <Table>
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
                            ? props.offers.map((item, index) => (
                                  <TableRow
                                      key={item.id}
                                      onClick={() => handleClickOpen(item.id)}
                                      hover={true}
                                      className={classes.tableRow}
                                  >
                                      {headCells.map((cell, index) => (
                                          <TableCell key={'tableCell-' + index}>
                                              {getCellContent(item, cell.id)}
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              ))
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            {open && (
                <OfferDetails
                    open={open}
                    row={selectedRow}
                    handleClose={() => {
                        setOpen(false);
                    }}
                    key={selectedRow}
                />
            )}
        </PaddingLayout>
    );
};

const mapStateToProps = (state) => ({
    offers: state.offers.filteredOffers,
});

const mapDispatchToProps = {
    setOffers,
    updateOffers,
    setSearchFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersOverview);
