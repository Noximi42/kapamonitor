import React, { useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PaddingLayout from '../../components/PaddingLayout';
import CustomListItem from '../../components/CustomListItem';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({}));

const OffersOverview = (props) => {
    const classes = useStyles();

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
    ];

    let rows = [];

    for (let item of exampleData) {
        rows.push(<CustomListItem></CustomListItem>);
    }

    return (
        <PaddingLayout title="Deine Angebote">
            <div className={classes.root}>{rows}</div>
        </PaddingLayout>
    );
};

const mapStateToProps = (state) => ({
    // TODO StateToProps
    // rawLocations: state.leaflet.rawLocations,
});

const mapDispatchToProps = {
    // TODO Redux actions
    // setRawLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersOverview);
