import React, { useEffect } from 'react';
import PaddingLayout from '../../components/PaddingLayout';
import { makeStyles } from '@material-ui/core/styles';
import CustomTextinput from '../../components/CustomTextinput';
import CustomButton from '../../components/CustomButton';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Dashboard = (props) => {
    const classes = useStyles();

    return (
        <PaddingLayout>
            <div class="container-fluid">
                {CustomTextinput({
                    title: 'pretty title',
                })}
            </div>
            <div class="container-fluid">
                {CustomButton({type: "save"})}
                {CustomButton({type: "delete"})}
            </div>
        </PaddingLayout>
    );
};

export default Dashboard;
