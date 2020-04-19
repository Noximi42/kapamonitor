import React, { useEffect } from 'react';
import PaddingLayout from '../../components/PaddingLayout';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const CustomButton = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() =>
                    console.log('Hi! Admin. Du hast Löschen angeklickt')
                }
            >
                Löschen
            </Button>

            <Button
                variant="contained"
                color="primary"
                /* size="small" */
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() =>
                    console.log('Hi! Admin. Du hast Speichern angeklickt')
                }
            >
                Speichern
            </Button>
        </React.Fragment>
    );
};

export default CustomButton;
