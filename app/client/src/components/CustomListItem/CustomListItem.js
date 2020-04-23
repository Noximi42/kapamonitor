import React from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({}));

const CustomListItem = (props) => {
    const classes = useStyles();

    return (
        <Paper
            className={classes.paper}
            style={{ padding: 20, marginBottom: 20 }}
        >
            <Grid container alignItems="stretch">
                <Grid item xs={12} sm={1}>
                    <Checkbox
                        checked={props.item.checked}
                        onChange={props.handleCheckbox}
                        inputProps={{ 'aria-label': 'Check Item' }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle1">
                        {props.item.ikId ? props.item.ikId : 'Artikelname'}
                    </Typography>
                    {props.children}
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography variant="subtitle1">
                        Zusatzinformationen
                    </Typography>
                    <Typography variant="subtitle2">500 Stück</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CustomListItem;
