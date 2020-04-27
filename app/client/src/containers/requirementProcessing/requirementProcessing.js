import React from 'react';
import PaddingLayout from '../../components/PaddingLayout';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomCheckbox from '../../components/CustomCheckbox';
import CustomDropdown from '../../components/CustomDropdown';
import CustomTextinput from '../../components/CustomTextinput';
import CustomButton from '../../components/CustomButton';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 800,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const masterDataRessources = {
    1: {
        name: 'Handschuhe',
        certificates: {
            1: 'Schutzklasse X',
            2: 'Zertifikat Y',
        },
    },
};

const Dashboard = (props) => {
    const [age, setAge] = React.useState('');

    const handleChangeDropdown = (event) => {
        setAge(event.target.value);
    };

    return (
        <PaddingLayout>
            <div class="container-fluid">
                {CustomTextinput({
                    title: 'Titel',
                    initialName: "Test"
                })}
            </div>
            <br></br>

            {CustomDropdown({
                headline: 'Bedarf Ressource',
                itemKeys: [10, 20, 30],
                itemValues: { 10: 'Ten', 20: 'Twenty', 30: 'Thirty' },
            })}
            <br></br>
            <FormControlLabel
                control={CustomCheckbox({ checkboxId: '10' })}
                label="Primary"
            />
            <FormControlLabel
                control={CustomCheckbox({ checkboxId: '20' })}
                label="Primary"
            />
        </PaddingLayout>
    );
};

export default Dashboard;
