import React, { useEffect } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {
    TableCell,
    Typography,
    FormControl,
    FormLabel,
    FormGroup,
    Checkbox,
    Input,
    InputLabel,
} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { getAllLocations } from '../../services/backend-rest-service';
import PaddingLayout from '../../components/PaddingLayout';
import { HospitalDetail } from '../../components/HospitalDetail';
import { setRawLocations } from '../../store/leaflet/actions';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableRow: {
        cursor: 'pointer',
    },
    checkboxFormControl: {
        marginRight: 100,
    },
    inputFormControl: {
        marginRight: 40,
    },
});

const getCellContent = (row, cellId) => {
    switch (cellId) {
        case 'resource':
            return `Handschuhe`;
            break;
        case 'amount':
            return `${row.capacity}`;
            break;
        default:
            return row[cellId];
    }
};

const Dashboard = (props) => {
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
            id: 'postCode',
            label: t('pages.offerOverview.table.postcode'),
            numberic: true,
        },
    ];

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

    function handleClickOpen(index) {
        setOpen(true);
        setSelectedRow(index);
    }
    function handleFilterTypeChange(index) {
        // handle resource selected/deselected in filter
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <PaddingLayout>
            <TableContainer component={Paper}>
                <Box component="div" m={2}>
                    <FormControl className={classes.checkboxFormControl}>
                        <FormLabel component="legend">Filter</FormLabel>
                        <FormGroup>
                            {props.rawResources
                                ? props.rawResources.map((resource, index) => (
                                      <FormControlLabel
                                          control={
                                              <Checkbox
                                                  name={resource.id}
                                                  defaultChecked={true}
                                                  onChange={() =>
                                                      handleFilterTypeChange(
                                                          index
                                                      )
                                                  }
                                              />
                                          }
                                          label={resource.name}
                                      />
                                  ))
                                : null}
                        </FormGroup>
                    </FormControl>
                    <FormControl className={classes.inputFormControl}>
                        <InputLabel htmlFor="postCode">
                            {t('pages.offerOverview.postcode')}
                        </InputLabel>
                        <Input id="postCode" name="postCode" />
                    </FormControl>
                    <FormControl className={classes.inputFormControl}>
                        <InputLabel htmlFor="radius">
                            {t('pages.offerOverview.distance')}
                        </InputLabel>
                        <Input id="radius" name="radius" />
                    </FormControl>
                </Box>
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
                        {props.rawLocations
                            ? props.rawLocations.map((row, index) => (
                                  <TableRow
                                      key={row.id}
                                      onClick={() => handleClickOpen(index)}
                                      hover={true}
                                      className={classes.tableRow}
                                  >
                                      {headCells.map((cell) => (
                                          <TableCell>
                                              {getCellContent(row, cell.id)}
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              ))
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
            >
                {props.rawLocations ? (
                    <>
                        <DialogTitle>
                            {props.rawLocations[selectedRow] &&
                                props.rawLocations[selectedRow].title}
                        </DialogTitle>
                        <HospitalDetail
                            location={props.rawLocations[selectedRow]}
                        ></HospitalDetail>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </>
                ) : null}
            </Dialog>
        </PaddingLayout>
    );
};

const mapStateToProps = (state) => ({
    rawLocations: state.leaflet.rawLocations,
    rawResources: [
        //hard coded for debug purposes
        {
            id: 'handschuhe',
            name: 'Handschuhe',
            selected: true,
        },
        {
            id: 'atemmasken',
            name: 'Atemmasken',
            selected: true,
        },
    ],
});

const mapDispatchToProps = {
    setRawLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
