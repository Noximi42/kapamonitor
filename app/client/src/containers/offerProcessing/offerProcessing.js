import React, { useEffect } from 'react';
import PaddingLayout from '../../components/PaddingLayout';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

/* export default function ComposedTextField() {
  const [name, setName] = React.useState('Composed TextField');
  const classes = useStyles();

  const handleChange = (event) => {
    setName(event.target.value);
  }; */

  /* const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })); */
  
/*   export default function FormPropsTextFields() {
    const classes = useStyles(); */

const Dashboard = (props) => {
    return (
        <PaddingLayout>
            <div class="container-fluid">
                <h1>Hello World! Here we go</h1>
            </div>
            <FormControl variant="outlined">
                <InputLabel htmlFor="component-outlined">Titel</InputLabel>
                <OutlinedInput
                    id="component-outlined"  label="Required" /* value={name} hier muss der prop rein */  /* onChange={handleChange} */  /* label="Name"  */
                />
            </FormControl>
            {/* <form className={classes.root} noValidate autoComplete="off">
  <TextField id="standard-basic" label="Standard" />
  <TextField id="filled-basic" label="Filled" variant="filled" />
  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
</form> */}
        </PaddingLayout>
    );
};



export default Dashboard;
