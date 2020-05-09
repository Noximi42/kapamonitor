//TODO: connection to backend (doing)

import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { getAllRequirements } from '../../__MOCK__/mockRequirements.js';
import { getAllResources } from '../../__MOCK__/mockRequirements.js';
import { getAllUom } from '../../__MOCK__/mockRequirements.js';
import { getAllLocations } from '../../__MOCK__/mockRequirements.js';
import PaddingLayout from '../../components/PaddingLayout';
import { connect } from 'react-redux';
import DashboardFilterbox from '../../components/DashboardFilterbox';
//in dashboard werden Daten abgerufen, diese werden an Filterbox übergeben

export const headCells = [
    { id: 'location', label: 'Einrichtung', numberic: false },
    { id: 'resourceName', label: 'Resource', numberic: false },
    { id: 'amount', label: 'Anzahl', numberic: true },
];

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableRow: {
        cursor: 'pointer',
    },
}));



const getCellContent = (row, cellId) => {
    switch (cellId) {
        case 'location':
            var location = Locations.filter((loc) => loc.id == row.locationId);
            return location[0] ? location[0].locationName : 'none';
            break;
        case 'resourceName':
            var resources = Resources.filter((res) => res.id == row.resourceId);
            return resources[0] ? resources[0].resourceName : 'none';
            break;
        case 'amount':
            var resources = Resources.filter((res) => res.id == row.resourceId);
            var unit = Uom.filter((u) => u.id == resources[0].uomId);
            var numberAndUnit = `${row.number}`;
            return numberAndUnit && unit[0]
                ? numberAndUnit + unit[0].uomName
                : 'none';
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

const Dashboard = (props) => {
    const classes = useStyles();

    const [state, setState] = React.useState( {
        displayedRequirements: rawRequirements, //Startwert
    } );
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
        setSelectedRow(index);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const onFilterChange = (filteredList) => {
        setState({ ...state, displayedRequirements: filteredList });
        
    };
    return (
        
        <PaddingLayout>
            <DashboardFilterbox rawResources={Resources} data={rawRequirements} callback={onFilterChange}/> 
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {headCells.map((cell) => (
                                <TableCell>
                                    <strong>{cell.label}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            /*props.*/ state.displayedRequirements
                                ? /*props.*/ state.displayedRequirements.map(
                                      (row, index) => (
                                          <TableRow
                                              key={row.id}
                                              onClick={() =>
                                                  handleClickOpen(index)
                                              }
                                              hover={true}
                                              className={classes.tableRow}
                                          >
                                              {headCells.map((cell) => (
                                                  <TableCell>
                                                      {getCellContent(
                                                          row,
                                                          cell.id
                                                      )}
                                                  </TableCell>
                                              ))}
                                          </TableRow>
                                      )
                                  )
                                : null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
            >
                {
                    /*props.*/ rawRequirements[selectedRow] ? (
                        <>
                            <DialogTitle>
                                {
                                    (Resources.map(e => (rawRequirements[selectedRow].resourceId == e.id).resourceName))[0]
                                    
                                }
                            </DialogTitle>

                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </>
                    ) : null
                }
            </Dialog>
        </PaddingLayout>
    );
};


export default connect()(Dashboard);
