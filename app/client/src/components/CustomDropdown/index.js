import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { ListItemSecondaryAction } from '@material-ui/core';

const CustomDropdown = (props) => {
    const { headline, itemKeys, itemValues } = props;
    const [age, setAge] = React.useState('');

    const handleChangeDropdown = (event) => {
        setAge(event.target.value);
    };

    return (
        <div class="container-fluid">
            <InputLabel id="demo-simple-select-label">{headline}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChangeDropdown}
            >
                {itemKeys.map((index) => (
                    <MenuItem value={itemKeys[index]}>{itemValues[index]}</MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default CustomDropdown;
