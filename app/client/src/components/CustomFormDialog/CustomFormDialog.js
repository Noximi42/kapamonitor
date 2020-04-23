import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

export default function CustomFormDialog(props) {
    const initialState = props.initialState;
    const { handleSubmit, control, errors } = useForm({
        validateCriteriaMode: 'all',
    });
    const onSubmit = ((data) => {
        console.log(data);
        let updatedItem = {
            ...initialState.item,
            ...data,
        };
        props.handleClose(updatedItem);
    }).bind(this);

    return (
        <Dialog
            open={initialState.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">
                    {initialState.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {initialState.paragraph}
                    </DialogContentText>
                    <Controller
                        as={TextField}
                        name="ikId"
                        control={control}
                        rules={{ required: true }}
                        defaultValue=""
                        helperText={
                            errors?.ikId?.types?.required
                                ? 'Angebotsname erforderlich'
                                : ''
                        }
                        error={errors?.ikId ? true : false}
                        label="Angebotsname"
                        placeholder={initialState.item.ikId}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        {initialState.cancel}
                    </Button>
                    <Button type="submit" color="primary">
                        {initialState.confirm}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
