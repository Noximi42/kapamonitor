import React, { useEffect } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { TableCell, IconButton } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HotelIcon from '@material-ui/icons/Hotel';
import { getAllLocations } from '../../services/backend-rest-service';
import PaddingLayout from '../../components/PaddingLayout';
import { HospitalDetail } from '../../components/HospitalDetail';
import { setRawLocations } from '../../store/leaflet/actions';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Edit, Delete, Info } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';

export const headCells = [
    { id: 'type', label: 'Typ', numberic: false },
    { id: 'title', label: 'Name', numberic: false },
    { id: 'street', label: 'Strasse', numberic: false },
    { id: 'postCode', label: 'PLZ', numberic: true },
    { id: 'city', label: 'Stadt', numberic: false },
    { id: 'numberOfBeds', label: 'Anzahl Betten', numberic: true },
    { id: 'freeBeds', label: 'Auslastung', numberic: true },
];

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableRow: {
        cursor: 'pointer',
    },
});

const getIconForType = (type) => {
    switch (type) {
        case 'Hotel':
            return <HotelIcon alt="Hotel"></HotelIcon>;
            break;
        case 'Hospital':
            return <LocalHospitalIcon alt="Krankenhaus"></LocalHospitalIcon>;
            break;
    }
};

const getNumberOfBedsForType = (row) => {
    switch (row.type) {
        case 'Hotel':
            return (
                row.hotel.bedsWithVentilatorWithCarpet +
                row.hotel.bedsWithoutVentilatorWithCarpet +
                row.hotel.bedsWithVentilatorOtherFLoor
            );
            break;
        case 'Hospital':
            return (
                row.hospital.bedsWithVentilator +
                row.hospital.bedsWithoutVentilator
            );
            break;
    }
};
const getCellContent = (row, cellId) => {
    switch (cellId) {
        case 'street':
            return `${row.street} ${row.houseNumber}`;
            break;
        case 'type':
            return getIconForType(row.type);
            break;
        case 'numberOfBeds':
            return getNumberOfBedsForType(row);
            break;
        case 'freeBeds':
            return (
                <LinearProgress
                    variant="determinate"
                    value={row.capacity}
                ></LinearProgress>
            );
        default:
            return row[cellId];
    }
};

const OfferOverview = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    useEffect(() => {
        async function fetchRows() {
            const res = await getAllLocations();

            if (res.status === 200) {
                if (res.data.length > 0) {
                    const mockCapacity = res.data.map((location) => ({
                        ...location,
                        capacity: Math.floor(Math.random() * 100),
                    }));
                    props.setRawLocations(mockCapacity);
                }
            }
        }

        fetchRows();
    }, []);

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <PaddingLayout title="Deine Angebote">
            <div className={classes.root}>
                <Paper className={classes.paper} style={{ padding: 20 }}>
                    <Grid container>
                        <Grid item xs={12} sm={1}>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'Check Item' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="subtitle1">
                                Artikelname
                            </Typography>
                            <IconButton>
                                <Edit />
                            </IconButton>
                            <IconButton>
                                <Delete />
                            </IconButton>
                            <IconButton>
                                <Info />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="subtitle1">
                                Zusatzinformationen
                            </Typography>
                            <Typography variant="subtitle2">
                                500 Stück
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </PaddingLayout>
    );
};

const mapStateToProps = (state) => ({
    rawLocations: state.leaflet.rawLocations,
});

const mapDispatchToProps = {
    setRawLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferOverview);
