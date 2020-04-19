import React, { useEffect } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import makeStyles from '@material-ui/core/styles/makeStyles';
//import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HotelIcon from '@material-ui/icons/Hotel';
//import { getAllLocations } from '../services/backend-rest-service';
import { getAllRequirements } from '../../__MOCK__/mockRequirements.js';
import { getAllResources } from '../../__MOCK__/mockRequirements.js';
import { getAllUom } from '../../__MOCK__/mockRequirements.js';
import { getAllLocations } from '../../__MOCK__/mockRequirements.js';
import PaddingLayout from '../../components/PaddingLayout';
//import { HospitalDetail } from '../components/HospitalDetail';
import { connect } from 'react-redux';

export const headCells = [
    { id: 'location', label: 'Einrichtung', numberic: false },
    { id: 'resourceName', label: 'Resource', numberic: false },
    { id: 'amount', label: 'Anzahl', numberic: true },
];

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableRow: {
        cursor: 'pointer',
    }
});

const getIconForType = type => {
    switch (type) {
        case 'Hotel':
            return (<HotelIcon alt="Hotel"></HotelIcon>);
            break;
        case 'Hospital':
            return (<LocalHospitalIcon alt="Krankenhaus"></LocalHospitalIcon>);
            break;
    }
}

const getNumberOfBedsForType = (row) => {
    switch (row.type) {
        case 'Hotel':
            return row.hotel.bedsWithVentilatorWithCarpet + row.hotel.bedsWithoutVentilatorWithCarpet + row.hotel.bedsWithVentilatorOtherFLoor;
            break;
        case 'Hospital':
            return row.hospital.bedsWithVentilator + row.hospital.bedsWithoutVentilator;
            break;
    }
}


const getCellContent = (row, cellId) => {
    switch (cellId) {
        case 'location':
            var location = Locations.filter(loc => (loc.id == row.locationId));
            return location[0] ? location[0].locationName : "none";
            break;
        case 'resourceName':
            var resources = Resources.filter(res => (res.id == row.resourceId));
            return resources[0]? resources[0].resourceName : "none";
            break;
        case 'amount':
            var resources = Resources.filter(res => (res.id == row.resourceId));
            var unit = Uom.filter(u => 
                (u.id == resources[0].uomId)
            );
            var numberAndUnit = `${row.number}`
            return (numberAndUnit &&  unit[0])? numberAndUnit + unit[0].uomName : "none";
            break;
        default:
            return row[cellId];
    }
};
/*const rawRequirements = [{id: "1", locationId: "1", resourceId: "1", number: 200}, {id: "2", locationId: "1", resourceId: "2", number: 300}, {id: "3", locationId: "0", resourceId: "1", number: 300}];
const Resources = [{id: "1", resourceName: "Desinfektionsmittel", uomId: "1"}, {id: "2", resourceName: "Lokalität", uomId: "2"}];
const Uom = [{id: "1", uomName: "l"}, {id: "2", uomName: "m^2"}];
const Locations = [{id: "0", locationName: "Beispielkrankenhaus0"}, {id: "1", locationName: "Beispielkrankenhaus1"}];
*/

const rawRequirements = getAllRequirements();
const Resources = getAllResources();
const Uom = getAllUom();
const Locations = getAllLocations();

const Dashboard = props => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    /*useEffect(() => {
        async function fetchRows() {
            const res = await getAllLocations();

            if (res.status === 200) {
                if (res.data.length > 0) {
                    const mockCapacity = res.data.map(location => ({
                        ...location,
                        capacity: Math.floor(Math.random() * 100)
                    }));
                    props.setRawLocations(mockCapacity); //in die prps des Dashboardobjekts
                }
            }
        }

        fetchRows();
    }, []);*/

    function handleClickOpen(index) {
        setOpen(true);
        setSelectedRow(index)
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (<PaddingLayout>
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {headCells.map(cell => (
                            <TableCell><strong>{cell.label}</strong></TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*props.*/rawRequirements ? /*props.*/rawRequirements.map((row, index) => (
                        <TableRow key={row.id} onClick={() => handleClickOpen(index)} hover={true}
                                  className={classes.tableRow}>
                            {headCells.map(cell => (
                                <TableCell>{getCellContent(row, cell.id)}</TableCell>
                            ))}
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
        </TableContainer>
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md"
        >
            {/*props.*/rawRequirements ?
                <>
                    <DialogTitle>{/*props.*/rawRequirements[selectedRow] && /*props.*/rawRequirements[selectedRow].title}</DialogTitle>
                    
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions></> : null}

        </Dialog>
    </PaddingLayout>)
};

/*<HospitalDetail location={props.rawRequirements[selectedRow]}></HospitalDetail>*/
/*const mapStateToProps = state => ({
    rawRequirements: state.leaflet.rawRequirements,
})

const mapDispatchToProps = {
    setRawRequirements
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);*/
export default connect()(Dashboard);


