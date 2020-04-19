import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PaddingLayout from '../../components/PaddingLayout';
import CustomListItem from '../../components/CustomListItem';
import { connect } from 'react-redux';
import { setOffers } from '../../store/offers/actions';

const useStyles = makeStyles((theme) => ({}));

const exampleData = [
    {
        id: 0,
        ikId: 'This some Test',
        isEmergencyHospital: true,
        bedsWithVentilator: 200,
        bedsWithoutVentilator: 500,
        barrierFree: true,
        locationId: 0,
    },
    {
        id: 1,
        ikId: 'This some Testdata',
        isEmergencyHospital: true,
        bedsWithVentilator: 0,
        bedsWithoutVentilator: 0,
        barrierFree: true,
        locationId: 1,
    },
    {
        id: 2,
        ikId: 'Ding 2',
        isEmergencyHospital: true,
        bedsWithVentilator: 0,
        bedsWithoutVentilator: 0,
        barrierFree: true,
        locationId: 2,
    },
    {
        id: 3,
        ikId: 'Ein Ding',
    },
    {
        id: 4,
        ikId: 'Ein Ding',
    },
    {
        id: 5,
        ikId: 'Ein Ding',
    },
];

function simulateHTTPRequest() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(exampleData);
        }, 5000);
    });
}

const OffersOverview = (props) => {
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            const res = await simulateHTTPRequest().then((data) => {
                console.log('Fetch completed');
                console.log('data', data);
                props.setOffers(data);
            });

            console.log(res);
        }

        fetchData();
    }, []);

    let rows = [];

    for (let item of props.offers) {
        rows.push(<CustomListItem key={item.id} item={item} />);
    }

    return (
        <PaddingLayout title="Deine Angebote">
            <div className={classes.root}>{rows}</div>
        </PaddingLayout>
    );
};

const mapStateToProps = (state) => ({
    // TODO StateToProps
    offers: state.offers.filteredOffers,
});

const mapDispatchToProps = {
    // TODO Redux actions
    setOffers,
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersOverview);
