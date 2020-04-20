import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PaddingLayout from '../../components/PaddingLayout';
import CustomListItem from '../../components/CustomListItem';
import SearchPanel from '../../components/SearchPanel';
import { connect } from 'react-redux';
import {
    setOffers,
    updateOffers,
    setSearchFilter,
} from '../../store/offers/actions';
import { getAllOffers } from '../../services/backend-rest-service';
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
    const classes = useStyles();

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
            />
        );
    }

    return (
        <PaddingLayout title="Deine Angebote">
            <div className={classes.root}>
                <SearchPanel
                    handleSearch={(event) => {
                        props.setSearchFilter(event.target.value);
                    }}
                />
                {rows}
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
