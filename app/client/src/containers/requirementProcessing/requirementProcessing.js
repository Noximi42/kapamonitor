import React from 'react';
import PaddingLayout from '../../components/PaddingLayout';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 800,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Dashboard = (props) => {
    const [age, setAge] = React.useState('');

    const handleChangeDropdown = (event) => {
        setAge(event.target.value);
    };

    const [state, setState] = React.useState({
        checkedB: true,
    });

    const handleChangeCheckbox = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <PaddingLayout>
            <div class="container-fluid">
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChangeDropdown}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>
            <br></br>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeCheckbox}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Primary"
            />
        </PaddingLayout>
    );
};

export default Dashboard;
