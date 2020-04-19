import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Edit, Delete, Info } from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  itembox: {
    width: "fit-content",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    "& svg": {
      margin: theme.spacing(0.2),
    },
    "& hr": {
      margin: theme.spacing(0, 0.2),
    },
  },
}));

const CustomListItem = (props) => {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  console.log('Props', props)

//   const [state, setState] = useState((previousState)=>{
//       console.log('PreviousState',previousState);
//   });

  return (
    <Paper className={classes.paper} style={{ padding: 20, marginBottom: 20 }}>
      <Grid container alignItems="stretch">
        <Grid item xs={12} sm={1}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "Check Item" }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">Artikelname</Typography>
          <Grid container alignItems="center" className={classes.itembox}>
            <IconButton>
              <Edit />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
              <Delete />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
              <Info />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="subtitle1">Zusatzinformationen</Typography>
          <Typography variant="subtitle2">500 Stück</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  // rawLocations: state.leaflet.rawLocations,
});

const mapDispatchToProps = {
  // setRawLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);
