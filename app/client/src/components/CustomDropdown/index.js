import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { ListItemSecondaryAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    divDropdown: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    dropdown: {
        minWidth: 120,
    },
}));

const CustomDropdown = (props) => {
    const classes = useStyles();
    const { headline, itemKeys, itemValues } = props;
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div class="container-fluid">
            <div className={classes.divDropdown}>
                <InputLabel id="demo-simple-select-label">
                    {headline}
                </InputLabel>
                <Select
                    className={classes.dropdown}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    {/*{itemKeys.map((index) => (
                    <MenuItem value={itemKeys[index]}>
                        {itemValues[index]}
                    </MenuItem>
                ))}*/}
                </Select>
            </div>
        </div>
    );
};

export default CustomDropdown;
