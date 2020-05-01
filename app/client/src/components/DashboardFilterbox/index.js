import React from 'react';
import { FormControl, FormLabel, FormGroup, Input, InputLabel, Checkbox } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomCheckbox from '../../components/CustomCheckbox';
import makeStyles from '@material-ui/core/styles/makeStyles';



const useStyles = makeStyles((theme) => ({
    checkboxFormControl: {
        marginRight: 100,
    },
    inputFormControl: {
        marginRight: 40,
    },
}));


const DashboardFilterbox  = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        selectedResources: props.rawResources.map(r => (r.id)),

    });

    const onCheckboxChanged = (resource, index) => {

        if(state.selectedResources.includes(resource.id)) { //die Res die sich geändert hat ist mit drin, dh sie wurde unselected
            state.selectedResources = state.selectedResources.filter(r => (r != resource.id));
        } else { //es wurde jetzt ausgewählt
            state.selectedResources.push(resource.id);
        }
        
        setState({ selectedResources: state.selectedResources });
        let result = props.data.filter(element => (state.selectedResources.includes(element.resourceId))); //??
        props.callback(result);
    };
    
    return (
        <div class="container-fluid">
            <Box component="div" m={2}>
                <FormControl className={classes.checkboxFormControl}>
                    <FormLabel component="legend">Filter</FormLabel>
                    <FormGroup>
                        {props.rawResources ? props.rawResources.map((resource, index) => (
                            <FormControlLabel
                                control={<Checkbox id={"resourceCheckbox"+resource.resourceName} defaultChecked={true} onChange={() => onCheckboxChanged(resource, index)}/>}
                                label={resource.resourceName}
                            />
                        )) : null}
                    </FormGroup>
                </FormControl>
                <FormControl className={classes.inputFormControl}>
                    <InputLabel htmlFor="postCode">PLZ</InputLabel>
                    <Input id="postCode" name="postCode" />
                </FormControl>
                <FormControl className={classes.inputFormControl}>
                    <InputLabel htmlFor="radius">Umkreis in km</InputLabel>
                    <Input id="radius" name="radius" />
                </FormControl>
            </Box>
        </div>
    );
   
};

export default DashboardFilterbox;
