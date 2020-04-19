import React, { useEffect } from 'react';
import PaddingLayout from '../../components/PaddingLayout';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Dashboard = (props) => {
    const [name, setName] = React.useState('');
    const classes = useStyles();

    const handleChangeTitle = (event) => {
        setName(event.target.value);
    };
    return (
        <PaddingLayout>
            <div class="container-fluid">
                
            
            <FormControl>
        <InputLabel htmlFor="component-simple">Titel</InputLabel>
        <Input id="component-simple" value={name} onChange={handleChangeTitle} />
      </FormControl>
      
     </div>

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => console.log('Hi! Admin. Du hast Löschen angeklickt')}
      >
        Löschen
      </Button>

      <Button
        variant="contained"
        color="primary"
        /* size="small" */
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={() => console.log('Hi! Admin. Du hast Speichern angeklickt')}
      >
        Speichern
      </Button>
        </PaddingLayout>
    );
};

export default Dashboard;
