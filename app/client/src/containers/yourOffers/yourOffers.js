import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Edit, Delete, Info } from '@material-ui/icons';
import {
    PaddingLayout,
    SearchPanel,
    CustomListItem,
    CustomIconRow,
    EditOfferFormDialog,
} from '../../components';
import { connect } from 'react-redux';
import {
    setOffers,
    updateOffers,
    setSearchFilter,
} from '../../store/offers/actions';
import {
    getAllOffers,
    deleteOffer,
    getOffer,
} from '../../services/backend-rest-service';
import { useTranslation } from 'react-i18next';
import { exampleData } from '../../__MOCK__/mockData';

const useStyles = makeStyles((theme) => ({}));

function simulateHTTPRequest() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(exampleData);
        }, 5000);
    });
}

const YourOffers = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(0);

    useEffect(() => {
        async function fetchData() {
            let res = await simulateHTTPRequest()
                .then((data) => {
                    console.log('Fetch completed');
                    const extendedData = data.map((v) => ({
                        ...v,
                        checked: false,
                    }));
                    return extendedData;
                })
                .then((data) => {
                    props.setOffers(data);
                    return data;
                });

            res = await getAllOffers();
        }

        fetchData();
    }, []);

    let rows = [];

    // setOpenEdit(true);

    for (let item of props.offers) {
        rows.push(
            <CustomListItem
                key={item.id}
                item={item}
                handleCheckbox={(event) => {
                    props.updateOffers([
                        {
                            ...item,
                            checked: event.target.checked,
                        },
                    ]);
                }}
            >
                <CustomIconRow
                    icons={[<Edit />, <Delete />, <Info />]}
                    clickHandlers={[
                        function () {
                            console.log('Function 1');
                            setSelectedItem(item);
                            setOpenEdit(true);
                        },
                        async function () {
                            console.log('Function 2');
                            setSelectedItem(item);
                            await deleteOffer(item.id);
                            setSelectedItem(0);
                        },
                        async function () {
                            console.log('Function 3');
                            setSelectedItem(item);
                            setOpenDetails(true);
                            await getOffer(item.id);
                            //setSelectedItem();
                        },
                    ]}
                />
            </CustomListItem>
        );
    }

    return (
        <PaddingLayout title={t('pages.yourOffers.title')}>
            <div className={classes.root}>
                <SearchPanel
                    handleSearch={(event) => {
                        props.setSearchFilter(event.target.value);
                    }}
                />
                {rows}
                <EditOfferFormDialog
                    initialState={{
                        open: openEdit,
                        confirm: t('pages.yourOffers.save'),
                        cancel: t('pages.yourOffers.cancel'),
                        title: 'Angebot ' + selectedItem.id + ' bearbeiten',
                        paragraph: 'Hier können Sie ihr Angebot bearbeiten',
                        item: selectedItem,
                    }}
                    handleClose={(item) => {
                        setOpenEdit(false);
                        props.updateOffers([item]);
                    }}
                />
                <EditOfferFormDialog
                    initialState={{
                        open: openDetails,
                        confirm: 'Speichern',
                        cancel: 'Abbrechen',
                        title: 'Details zum Angebot ' + selectedItem.id,
                        paragraph:
                            'Hier können Sie Details des Angebots einsehen',
                        item: selectedItem,
                    }}
                    handleClose={(item) => {
                        setOpenDetails(false);
                    }}
                />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(YourOffers);
