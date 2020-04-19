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

const onClickSave = (event) => {
    console.log('Hi! Admin. Du hast Speichern angeklickt');
};

const onClickDelete = (event) => {
    console.log('Hi! Admin. Du hast Löschen angeklickt');
};

const CustomButton = (props) => {
    const { type } = props;
    const classes = useStyles();
    var icon = <SaveIcon />;
    var buttonColor = 'primary';
    var buttonText = 'Speichern';
    var functionHandle = onClickSave;
    if (type == 'save') {
        icon = <SaveIcon />;
        buttonColor = 'primary';
        buttonText = 'Speichern';
        var functionHandle = onClickSave;
    } else if (type == 'delete') {
        icon = <DeleteIcon />;
        buttonColor = 'secondary';
        buttonText = 'Löschen';
        var functionHandle = onClickDelete;
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color={buttonColor}
                className={classes.button}
                startIcon={icon}
                onClick={functionHandle}
            >
                {buttonText}
            </Button>
        </React.Fragment>
    );
};

export default CustomButton;
